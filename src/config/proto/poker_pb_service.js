// package: net.gurigoro.kaiji.poker
// file: poker.proto

var jspb = require("google-protobuf");
var poker_pb = require("./poker_pb");
var trump_pb = require("./trump_pb");
var Poker = {
  serviceName: "net.gurigoro.kaiji.poker.Poker"
};
Poker.CreateNewGameRoom = {
  methodName: "CreateNewGameRoom",
  service: Poker,
  requestStream: false,
  responseStream: false,
  requestType: poker_pb.CreateNewGameRoomRequest,
  responseType: poker_pb.CreateNewGameRoomReply
};
Poker.Call = {
  methodName: "Call",
  service: Poker,
  requestStream: false,
  responseStream: false,
  requestType: poker_pb.CallRequest,
  responseType: poker_pb.CallReply
};
Poker.Raise = {
  methodName: "Raise",
  service: Poker,
  requestStream: false,
  responseStream: false,
  requestType: poker_pb.RaiseRequest,
  responseType: poker_pb.RaiseReply
};
Poker.Check = {
  methodName: "Check",
  service: Poker,
  requestStream: false,
  responseStream: false,
  requestType: poker_pb.CheckRequest,
  responseType: poker_pb.CheckReply
};
Poker.Fold = {
  methodName: "Fold",
  service: Poker,
  requestStream: false,
  responseStream: false,
  requestType: poker_pb.FoldRequest,
  responseType: poker_pb.FoldReply
};
Poker.SetPlayersCards = {
  methodName: "SetPlayersCards",
  service: Poker,
  requestStream: false,
  responseStream: false,
  requestType: poker_pb.SetPlayersCardsRequest,
  responseType: poker_pb.SetPlayersCardsReply
};
Poker.GetGameResult = {
  methodName: "GetGameResult",
  service: Poker,
  requestStream: false,
  responseStream: false,
  requestType: poker_pb.GetGameResultRequest,
  responseType: poker_pb.GetGameResultReply
};
Poker.DestroyGameRoom = {
  methodName: "DestroyGameRoom",
  service: Poker,
  requestStream: false,
  responseStream: false,
  requestType: poker_pb.DestroyGameRoomRequest,
  responseType: poker_pb.DestroyGameRoomReply
};
module.exports = {
  Poker: Poker,
};

