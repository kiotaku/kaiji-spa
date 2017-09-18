// package: net.gurigoro.kaiji
// file: kaiji.proto

var jspb = require("google-protobuf");
var kaiji_pb = require("./kaiji_pb");
var Kaiji = {
  serviceName: "net.gurigoro.kaiji.Kaiji"
};
Kaiji.Ping = {
  methodName: "Ping",
  service: Kaiji,
  requestStream: false,
  responseStream: false,
  requestType: kaiji_pb.PingRequest,
  responseType: kaiji_pb.PingReply
};
Kaiji.Log = {
  methodName: "Log",
  service: Kaiji,
  requestStream: false,
  responseStream: false,
  requestType: kaiji_pb.LogRequest,
  responseType: kaiji_pb.Empty
};
Kaiji.GetUserById = {
  methodName: "GetUserById",
  service: Kaiji,
  requestStream: false,
  responseStream: false,
  requestType: kaiji_pb.GetUserByIdRequest,
  responseType: kaiji_pb.GetUserReply
};
Kaiji.AddUser = {
  methodName: "AddUser",
  service: Kaiji,
  requestStream: false,
  responseStream: false,
  requestType: kaiji_pb.AddUserRequest,
  responseType: kaiji_pb.AddUserReply
};
Kaiji.ModifyUser = {
  methodName: "ModifyUser",
  service: Kaiji,
  requestStream: false,
  responseStream: false,
  requestType: kaiji_pb.ModifyUserRequest,
  responseType: kaiji_pb.AddUserReply
};
module.exports = {
  Kaiji: Kaiji,
};

