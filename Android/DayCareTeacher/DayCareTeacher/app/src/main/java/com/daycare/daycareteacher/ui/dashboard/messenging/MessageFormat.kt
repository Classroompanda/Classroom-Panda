package com.daycare.daycareparent.ui.dashboard.messenging

class MessageFormat {

    var username: String? = null
    var message: String? = null
    var uniqueId: String? = null

    constructor(uniqueId: String, username: String, message: String) {
        this.username = username
        this.message = message
        this.uniqueId = uniqueId
    }

    constructor() {}
}
