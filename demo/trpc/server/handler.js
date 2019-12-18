class Greeter {

    async SayHello(current, request) {

        console.log(`SayHello in:`, request)
        const reply = {
            msg: request.msg
        }
        return reply

    }

}

export default Greeter