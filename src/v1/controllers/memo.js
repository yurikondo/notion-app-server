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
  // URLのパラメーターを取得
  const { memoId } = req.params;
  try {
    //メモの内容を取得
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません❌");
    return res.status(200).json(memo);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  // URLのパラメーターを取得
  const { memoId } = req.params;
  const { title, description } = req.body;
  try {
    if (title === "") req.body.title = "無題";
    if (description === "") req.body.description = "自由に記入してください";

    //メモの内容を取得
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません❌");

    const updatedMemo = await Memo.findByIdAndUpdate(memoId, {
      // 全ての項目を更新
      $set: req.body,
    });

    return res.status(200).json(updatedMemo);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  // URLのパラメーターを取得
  const { memoId } = req.params;
  try {
    //メモの内容を取得
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません❌");

    await Memo.deleteOne({ _id: memoId });
    return res.status(200).json("メモを削除しました🗑️");
  } catch (err) {
    return res.status(500).json(err);
  }
};
