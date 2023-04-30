const Memo = require("../models/memo");

exports.create = async (req, res) => {
  try {
    //メモの個数を取得
    const memoCount = await Memo.find().count();
    //メモの新規作成
    const memo = await Memo.create({
      user: req.user._id,
      position: memoCount > 0 ? memoCount : 0,
    });
    return res.status(201).json(memo);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    //ログインしているユーザーのメモのを全て新規順に取得
    const memos = await Memo.find({ user: req.user._id }).sort("-position");
    return res.status(200).json(memos);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getOne = async (req, res) => {
  try {
    const { memoId } = req.params;
    //メモの内容を取得
    const memo = Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません❌");
    return res.status(200).json(memo);
  } catch (err) {
    return res.status(500).json(err);
  }
};
