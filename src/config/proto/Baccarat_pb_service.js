// package: net.gurigoro.kaiji.baccarat
// file: Baccarat.proto

var jspb = require("google-protobuf");
var Baccarat_pb = require("./Baccarat_pb");
var Baccarat = {
  serviceName: "net.gurigoro.kaiji.baccarat.Baccarat"
};
Baccarat.CreateNewGameRoom = {
  methodName: "CreateNewGameRoom",
  service: Baccarat,
  requestStream: false,
  responseStream: false,
  requestType: Baccarat_pb.CreateNewGameRoomRequest,
  responseType: Baccarat_pb.CreateNewGameRoomReply
};
Baccarat.Bet = {
  methodName: "Bet",
  service: Baccarat,
  requestStream: false,
  responseStream: false,
  requestType: Baccarat_pb.BetRequest,
  responseType: Baccarat_pb.BetReply
};
Baccarat.StartOpeningCards = {
  methodName: "StartOpeningCards",
  service: Baccarat,
  requestStream: false,
  responseStream: false,
  requestType: Baccarat_pb.StartOpeningCardsRequest,
  responseType: Baccarat_pb.StartOpeningCardsReply
};
Baccarat.GetGameResult = {
  methodName: "GetGameResult",
  service: Baccarat,
  requestStream: false,
  responseStream: false,
  requestType: Baccarat_pb.GetGameResultRequest,
  responseType: Baccarat_pb.GetGameResultReply
};
Baccarat.DestroyGameRoom = {
  methodName: "DestroyGameRoom",
  service: Baccarat,
  requestStream: false,
  responseStream: false,
  requestType: Baccarat_pb.DestroyGameRoomRequest,
  responseType: Baccarat_pb.DestroyGameRoomReply
};
module.exports = {
  Baccarat: Baccarat,
};

