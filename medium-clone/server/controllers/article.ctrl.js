const Article = require('./../models/Article');
const User = require('./../models/User');
const fs = require('fs');
const cloudinary = require('cloudinary');

module.exports = {
  addArticle: (req, res, next) => {
    let {text, title, claps, description} = req.body;
    if (req.files.image) {
      cloudinary.uploader.upload(req.files.image.path, (result) => {
        let obj = {text, title, claps, description, feature_img: result.url != null ? result.url: ''};
        saveArticle(obj);
      }, {
        resource_type: 'image',
        eager: [
          {effect: 'sepia'},
        ],
      });
    } else {
      saveArticle({text, title, claps, description, feature_img: ''});
    }
    function saveArticle(obj) {
      new Article(obj).save((err, article) => {
        if (err) {
          res.sendStatus(err);
        } else if (!article) {
          res.sendStatus(400);
        } else {
          return article.addAuthor(req.body.authorId).then((_article) => {
            return res.sendStatus(_article);
          });
        };
        next();
      });
    }
  },
  getAll: (req, res, next) => {
    Article.find(req.params.id)
      .populate('author')
      .populate('comments.author').exec((err, article) => {
        if (err) {
          res.sendStatus(err);
        } else if (!article) {
          res.sendStatus(404);
        } else {
          res.sendStatus(article);
        }
        next();
      });
  },
  clapArticle: (req, res, next) => {
    Article.findById(req.body.articleId).then((article) => {
      return article.clap().then(() => {
        return res.json({msg: 'Done'});
      });
    }).catch(next);
  },
  commentArticle: (req, res, next) => {
    Article.findById(req.body.articleId).then((article) => {
      return article.comment({
        author: req.body.authorId,
        text: req.body.comment,
      }).then(() => {
        return res.json({msg: 'Done'});
      });
    }).catch(next);
  },
  getArticle: (req, res, next) => {
    Article.findById(req.params.id)
      .populate('author')
      .populate('comments.author').exec((err, article) => {
        if (err) {
          res.sendStatus(err);
        } else if (!article) {
          res.sendStatus(404);
        } else {
          res.send(article);
        }
        next();
      });
  },
};
