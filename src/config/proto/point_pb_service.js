// package: net.gurigoro.kaiji
// file: point.proto

var jspb = require("google-protobuf");
var point_pb = require("./point_pb");
var Point = {
  serviceName: "net.gurigoro.kaiji.Point"
};
Point.GetPointBalance = {
  methodName: "GetPointBalance",
  service: Point,
  requestStream: false,
  responseStream: false,
  requestType: point_pb.GetPointBalanceRequest,
  responseType: point_pb.GetPointBalanceReply
};
Point.AddPoint = {
  methodName: "AddPoint",
  service: Point,
  requestStream: false,
  responseStream: false,
  requestType: point_pb.AddPointRequest,
  responseType: point_pb.AddPointReply
};
module.exports = {
  Point: Point,
};

