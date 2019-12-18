/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = {} 

$root.trpc = (function() {

    /**
     * Namespace trpc.
     * @exports trpc
     * @namespace
     */
    var trpc = {};

    trpc.test = (function() {

        /**
         * Namespace test.
         * @memberof trpc
         * @namespace
         */
        var test = {};

        test.helloworld = (function() {

            /**
             * Namespace helloworld.
             * @memberof trpc.test
             * @namespace
             */
            var helloworld = {};

            helloworld.Greeter = (function() {

                /**
                 * Constructs a new Greeter service.
                 * @memberof trpc.test.helloworld
                 * @classdesc Represents a Greeter
                 * @extends $protobuf.rpc.Service
                 * @constructor
                 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
                 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
                 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
                 */
                function Greeter(rpcImpl, requestDelimited, responseDelimited) {
                    $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
                }

                (Greeter.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = Greeter;

                /**
                 * Creates new Greeter service using the specified rpc implementation.
                 * @function create
                 * @memberof trpc.test.helloworld.Greeter
                 * @static
                 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
                 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
                 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
                 * @returns {Greeter} RPC service. Useful where requests and/or responses are streamed.
                 */
                Greeter.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                    return new this(rpcImpl, requestDelimited, responseDelimited);
                };

                /**
                 * Callback as used by {@link trpc.test.helloworld.Greeter#sayHello}.
                 * @memberof trpc.test.helloworld.Greeter
                 * @typedef SayHelloCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {trpc.test.helloworld.HelloReply} [response] HelloReply
                 */

                /**
                 * Calls SayHello.
                 * @function sayHello
                 * @memberof trpc.test.helloworld.Greeter
                 * @instance
                 * @param {trpc.test.helloworld.IHelloRequest} request HelloRequest message or plain object
                 * @param {trpc.test.helloworld.Greeter.SayHelloCallback} callback Node-style callback called with the error, if any, and HelloReply
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Greeter.prototype.sayHello = function sayHello(request, callback) {
                    return this.rpcCall(sayHello, $root.trpc.test.helloworld.HelloRequest, $root.trpc.test.helloworld.HelloReply, request, callback);
                }, "name", { value: "SayHello" });

                /**
                 * Calls SayHello.
                 * @function sayHello
                 * @memberof trpc.test.helloworld.Greeter
                 * @instance
                 * @param {trpc.test.helloworld.IHelloRequest} request HelloRequest message or plain object
                 * @returns {Promise<trpc.test.helloworld.HelloReply>} Promise
                 * @variation 2
                 */

                return Greeter;
            })();

            helloworld.HelloRequest = (function() {

                /**
                 * Properties of a HelloRequest.
                 * @memberof trpc.test.helloworld
                 * @interface IHelloRequest
                 * @property {string|null} [msg] HelloRequest msg
                 */

                /**
                 * Constructs a new HelloRequest.
                 * @memberof trpc.test.helloworld
                 * @classdesc Represents a HelloRequest.
                 * @implements IHelloRequest
                 * @constructor
                 * @param {trpc.test.helloworld.IHelloRequest=} [properties] Properties to set
                 */
                function HelloRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * HelloRequest msg.
                 * @member {string} msg
                 * @memberof trpc.test.helloworld.HelloRequest
                 * @instance
                 */
                HelloRequest.prototype.msg = "";

                /**
                 * Creates a new HelloRequest instance using the specified properties.
                 * @function create
                 * @memberof trpc.test.helloworld.HelloRequest
                 * @static
                 * @param {trpc.test.helloworld.IHelloRequest=} [properties] Properties to set
                 * @returns {trpc.test.helloworld.HelloRequest} HelloRequest instance
                 */
                HelloRequest.create = function create(properties) {
                    return new HelloRequest(properties);
                };

                /**
                 * Encodes the specified HelloRequest message. Does not implicitly {@link trpc.test.helloworld.HelloRequest.verify|verify} messages.
                 * @function encode
                 * @memberof trpc.test.helloworld.HelloRequest
                 * @static
                 * @param {trpc.test.helloworld.IHelloRequest} message HelloRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                HelloRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.msg);
                    return writer;
                };

                /**
                 * Encodes the specified HelloRequest message, length delimited. Does not implicitly {@link trpc.test.helloworld.HelloRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof trpc.test.helloworld.HelloRequest
                 * @static
                 * @param {trpc.test.helloworld.IHelloRequest} message HelloRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                HelloRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a HelloRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof trpc.test.helloworld.HelloRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {trpc.test.helloworld.HelloRequest} HelloRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                HelloRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.trpc.test.helloworld.HelloRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.msg = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a HelloRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof trpc.test.helloworld.HelloRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {trpc.test.helloworld.HelloRequest} HelloRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                HelloRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a HelloRequest message.
                 * @function verify
                 * @memberof trpc.test.helloworld.HelloRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                HelloRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        if (!$util.isString(message.msg))
                            return "msg: string expected";
                    return null;
                };

                /**
                 * Creates a HelloRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof trpc.test.helloworld.HelloRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {trpc.test.helloworld.HelloRequest} HelloRequest
                 */
                HelloRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.trpc.test.helloworld.HelloRequest)
                        return object;
                    var message = new $root.trpc.test.helloworld.HelloRequest();
                    if (object.msg != null)
                        message.msg = String(object.msg);
                    return message;
                };

                /**
                 * Creates a plain object from a HelloRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof trpc.test.helloworld.HelloRequest
                 * @static
                 * @param {trpc.test.helloworld.HelloRequest} message HelloRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                HelloRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.msg = "";
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        object.msg = message.msg;
                    return object;
                };

                /**
                 * Converts this HelloRequest to JSON.
                 * @function toJSON
                 * @memberof trpc.test.helloworld.HelloRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                HelloRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return HelloRequest;
            })();

            helloworld.HelloReply = (function() {

                /**
                 * Properties of a HelloReply.
                 * @memberof trpc.test.helloworld
                 * @interface IHelloReply
                 * @property {string|null} [msg] HelloReply msg
                 */

                /**
                 * Constructs a new HelloReply.
                 * @memberof trpc.test.helloworld
                 * @classdesc Represents a HelloReply.
                 * @implements IHelloReply
                 * @constructor
                 * @param {trpc.test.helloworld.IHelloReply=} [properties] Properties to set
                 */
                function HelloReply(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * HelloReply msg.
                 * @member {string} msg
                 * @memberof trpc.test.helloworld.HelloReply
                 * @instance
                 */
                HelloReply.prototype.msg = "";

                /**
                 * Creates a new HelloReply instance using the specified properties.
                 * @function create
                 * @memberof trpc.test.helloworld.HelloReply
                 * @static
                 * @param {trpc.test.helloworld.IHelloReply=} [properties] Properties to set
                 * @returns {trpc.test.helloworld.HelloReply} HelloReply instance
                 */
                HelloReply.create = function create(properties) {
                    return new HelloReply(properties);
                };

                /**
                 * Encodes the specified HelloReply message. Does not implicitly {@link trpc.test.helloworld.HelloReply.verify|verify} messages.
                 * @function encode
                 * @memberof trpc.test.helloworld.HelloReply
                 * @static
                 * @param {trpc.test.helloworld.IHelloReply} message HelloReply message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                HelloReply.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.msg);
                    return writer;
                };

                /**
                 * Encodes the specified HelloReply message, length delimited. Does not implicitly {@link trpc.test.helloworld.HelloReply.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof trpc.test.helloworld.HelloReply
                 * @static
                 * @param {trpc.test.helloworld.IHelloReply} message HelloReply message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                HelloReply.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a HelloReply message from the specified reader or buffer.
                 * @function decode
                 * @memberof trpc.test.helloworld.HelloReply
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {trpc.test.helloworld.HelloReply} HelloReply
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                HelloReply.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.trpc.test.helloworld.HelloReply();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.msg = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a HelloReply message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof trpc.test.helloworld.HelloReply
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {trpc.test.helloworld.HelloReply} HelloReply
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                HelloReply.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a HelloReply message.
                 * @function verify
                 * @memberof trpc.test.helloworld.HelloReply
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                HelloReply.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        if (!$util.isString(message.msg))
                            return "msg: string expected";
                    return null;
                };

                /**
                 * Creates a HelloReply message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof trpc.test.helloworld.HelloReply
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {trpc.test.helloworld.HelloReply} HelloReply
                 */
                HelloReply.fromObject = function fromObject(object) {
                    if (object instanceof $root.trpc.test.helloworld.HelloReply)
                        return object;
                    var message = new $root.trpc.test.helloworld.HelloReply();
                    if (object.msg != null)
                        message.msg = String(object.msg);
                    return message;
                };

                /**
                 * Creates a plain object from a HelloReply message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof trpc.test.helloworld.HelloReply
                 * @static
                 * @param {trpc.test.helloworld.HelloReply} message HelloReply
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                HelloReply.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.msg = "";
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        object.msg = message.msg;
                    return object;
                };

                /**
                 * Converts this HelloReply to JSON.
                 * @function toJSON
                 * @memberof trpc.test.helloworld.HelloReply
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                HelloReply.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return HelloReply;
            })();

            return helloworld;
        })();

        return test;
    })();

    return trpc;
})();

module.exports = {
    package: 'trpc.test.helloworld.Greeter',
    SayHello: {
        in: {
            verify: $root.trpc.test.helloworld.HelloRequest.verify,
            create: $root.trpc.test.helloworld.HelloRequest.create,
            encode: (...args) => $root.trpc.test.helloworld.HelloRequest.encode(...args).finish(),
            decode: $root.trpc.test.helloworld.HelloRequest.decode,
        },
        out: {
            verify: $root.trpc.test.helloworld.HelloReply.verify,
            create: $root.trpc.test.helloworld.HelloReply.create,
            encode: (...args) => $root.trpc.test.helloworld.HelloReply.encode(...args).finish(),
            decode: $root.trpc.test.helloworld.HelloReply.decode,
        }
    },
}
