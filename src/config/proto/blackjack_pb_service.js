// package: net.gurigoro.kaiji.blackjack
// file: blackjack.proto

var jspb = require("google-protobuf");
var blackjack_pb = require("./blackjack_pb");
var trump_pb = require("./trump_pb");
var BlackJack = {
  serviceName: "net.gurigoro.kaiji.blackjack.BlackJack"
};
BlackJack.CreateNewGameRoom = {
  methodName: "CreateNewGameRoom",
  service: BlackJack,
  requestStream: false,
  responseStream: false,
  requestType: blackjack_pb.CreateNewGameRoomRequest,
  responseType: blackjack_pb.CreateNewGameRoomReply
};
BlackJack.Betting = {
  methodName: "Betting",
  service: BlackJack,
  requestStream: false,
  responseStream: false,
  requestType: blackjack_pb.BettingRequest,
  responseType: blackjack_pb.BettingReply
};
BlackJack.SetFirstDealedCards = {
  methodName: "SetFirstDealedCards",
  service: BlackJack,
  requestStream: false,
  responseStream: false,
  requestType: blackjack_pb.SetFirstDealedCardsRequest,
  responseType: blackjack_pb.SetFirstDealedCardsReply
};
BlackJack.SetFirstDealersCard = {
  methodName: "SetFirstDealersCard",
  service: BlackJack,
  requestStream: false,
  responseStream: false,
  requestType: blackjack_pb.SetFirstDealersCardRequest,
  responseType: blackjack_pb.SetFirstDealersCardReply
};
BlackJack.Hit = {
  methodName: "Hit",
  service: BlackJack,
  requestStream: false,
  responseStream: false,
  requestType: blackjack_pb.HitRequest,
  responseType: blackjack_pb.HitReply
};
BlackJack.Stand = {
  methodName: "Stand",
  service: BlackJack,
  requestStream: false,
  responseStream: false,
  requestType: blackjack_pb.StandRequest,
  responseType: blackjack_pb.StandReply
};
BlackJack.Split = {
  methodName: "Split",
  service: BlackJack,
  requestStream: false,
  responseStream: false,
  requestType: blackjack_pb.SplitRequest,
  responseType: blackjack_pb.SplitReply
};
BlackJack.DoubleDown = {
  methodName: "DoubleDown",
  service: BlackJack,
  requestStream: false,
  responseStream: false,
  requestType: blackjack_pb.DoubleDownRequest,
  responseType: blackjack_pb.DoubleDownReply
};
BlackJack.SetNextDealersCard = {
  methodName: "SetNextDealersCard",
  service: BlackJack,
  requestStream: false,
  responseStream: false,
  requestType: blackjack_pb.SetNextDealersCardRequest,
  responseType: blackjack_pb.SetNextDealersCardReply
};
BlackJack.GetGameResult = {
  methodName: "GetGameResult",
  service: BlackJack,
  requestStream: false,
  responseStream: false,
  requestType: blackjack_pb.GetGameResultRequest,
  responseType: blackjack_pb.GetGameResultReply
};
BlackJack.DestroyGameRoom = {
  methodName: "DestroyGameRoom",
  service: BlackJack,
  requestStream: false,
  responseStream: false,
  requestType: blackjack_pb.DestroyGameRoomRequest,
  responseType: blackjack_pb.DestroyGameRoomReply
};
module.exports = {
  BlackJack: BlackJack,
};

