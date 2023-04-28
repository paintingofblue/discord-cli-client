/* eslint-disable no-unused-vars */
/* <-- Imports --> */
const { Client } = require("discord.js-selfbot-v13")
const { Utils } = require("./utils")
const { Ui } = require("./ui")
const blessed = require("blessed")
const contrib = require("blessed-contrib")

const utils = new Utils()
const config = Object.assign(utils.configSkeleton, utils.fetchConfig())
utils.writeConfig(config)

/* <-- Classes --> */
/**
 * The main class for the terminal client.
 */
class TerminalClient {
    constructor () {
        this.client = new Client({ checkUpdate: false })
        this.ui = new Ui(this.client, utils, config)
    }

    /**
     * Logs a message to the message box.
     *
     * @param {string} message - The message to log
     */
    logMessage (message) {
        console.log(message)
    }

    // Handle logging in to Discord & preparing the client
    login () {
        this.ui.prompt("login", "Logging in...")

        this.client.login(config.token).catch((_err) => {
            this.ui.prompt("large_error", `Error: ${_err.message}\nExiting in 5 seconds...`)

            setTimeout(() => {
                process.exit(0)
            }, 5000)
        })
    }
}

/* <-- Exports --> */
module.exports = {
    TerminalClient
}
