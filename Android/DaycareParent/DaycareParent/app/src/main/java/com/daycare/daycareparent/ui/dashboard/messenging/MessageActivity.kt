package com.daycare.daycareparent.ui.dashboard.messenging

import com.daycare.daycareparent.R
import android.arch.lifecycle.Observer
import android.databinding.DataBindingUtil
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.support.v7.widget.Toolbar
import android.util.Log
import android.widget.LinearLayout
import android.widget.Toast
import com.daycare.daycareparent.databinding.ActivityMessageBinding
import com.daycare.daycareparent.model.ChatHistoryModel
import com.daycare.daycareparent.model.ChatListData
import com.daycare.daycareparent.model.Data
import com.daycare.daycareparent.repository.ResponseCodes
import com.daycare.daycareparent.utill.*
import com.google.gson.Gson
import com.smartarmenia.dotnetcoresignalrclientjava.*
import java.lang.Exception
import com.google.gson.GsonBuilder
import com.google.gson.JsonParser
import org.json.JSONObject


class MessageActivity : AppCompatActivity(), HubConnectionListener, HubEventListener {


    lateinit var binding: ActivityMessageBinding
    lateinit var viewModel: MessageViewModel
    private lateinit var toolbar: Toolbar
    private val list = ArrayList<ChatHistoryData>()
    private lateinit var listAdapter: ChatAdapter
    var loader = Loader()
    var userData: Data? = Data()
    lateinit var recyclerView: RecyclerView
    var otherUser = ChatListData()
    private val connection: HubConnection = WebSocketHubConnectionP2("https://schoolpandaapp.azurewebsites.net/chat", "")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_message)
        viewModel = MessageViewModel()
        userData = PreferenceConnector.readUser(this@MessageActivity, PreferenceConnector.USER)

//        Connection to SignalR
        connection.addListener(this)
        connection.subscribeToEvent("messageReceived", this)

        otherUser = intent.getParcelableExtra<ChatListData>("user")
        setAdapter(otherUser)
        setToolbar()

        viewModel.getChatHistory(this, otherUser)
        attachObserver()

        binding.sendMsg.setOnClickListener {
            if (!binding.chatMsg.text.isNullOrEmpty()) {
                val data = ChatData()
                data.agencyID = userData?.agencyID
                data.message = binding.chatMsg.text.toString()
                data.senderUserID = userData?.loginUserID
                data.receiverUserID = otherUser.listUserId
//            val msg = toJsonString(data)
                try {
                    connection.invoke(
                        "sendMessage",
                        "",
                        data.message,
                        data.agencyID,
                        data.senderUserID,
                        data.receiverUserID
                    )

                } catch (e: Exception) {
                    Toast.makeText(this, e.message, Toast.LENGTH_SHORT).show()
                }

//                list.add(data)
//                listAdapter.notifyDataSetChanged()
                binding.chatMsg.text.clear()
                hideVirtualKeyboard(this@MessageActivity)

            }
        }
    }

    override fun onStart() {
        super.onStart()
        connect()
    }

    /**
     * connect method
     */

    private fun connect() {
        try {

            connection.subscribeToEvent("messageReceived", this)
            connection.connect()
        } catch (ex: Exception) {

            runOnUiThread { Toast.makeText(this, ex.message, Toast.LENGTH_SHORT).show() }
        }
    }

    /**
     * Unsubscribe all events and listeners on destroy
     */

    override fun onDestroy() {
        super.onDestroy()
        connection.removeListener(this)
        connection.unSubscribeFromEvent("messageReceived", this)
        connection.disconnect()
    }

    private fun setToolbar() {
        toolbar = binding.includeToolbar
        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener { finish() }
    }

    private fun setAdapter(data: ChatListData) {

//        ChatAdapter
        recyclerView = binding.recyclerView
        recyclerView.layoutManager = LinearLayoutManager(this, LinearLayout.VERTICAL, false)
        binding.recyclerView.layoutManager = recyclerView.layoutManager
        listAdapter = ChatAdapter(this, list, data)
        binding.recyclerView.adapter = listAdapter
        recyclerView.scrollToPosition(list.size - 1)
    }

    private fun attachObserver() {
        viewModel.chatHistory.observe(this, Observer<ChatHistoryModel> { it ->
            it?.let {
                if (it.statusCode == ResponseCodes.Success) {
                    it.data?.let { it1 ->
                        list.addAll(it1)
                        Log.d("list Data", list.toString());
                        listAdapter.notifyDataSetChanged()
                        recyclerView.scrollToPosition(list.size - 1)

                    }
                }
            }
        })
        viewModel.isLoading.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.startLoader(this)
                } else {
                    loader.stopLoader()
                }
            }

        })
    }

    override fun onConnected() {
        connection.invoke("getConnectionId", userData?.loginUserID)
        runOnUiThread {  Log.e("Connected","Connected")  }
    }

    override fun onMessage(message: HubMessage?) {
        runOnUiThread {

            try {
                if (message?.arguments?.size!! > 0) {
                    val data = message.arguments[1].toString()
                    val d = data.removeSurrounding("\"").replace("\\", "")
                    val gson = GsonBuilder().create()
                    val chatData = gson.fromJson(d, ChatData::class.java)
                    Log.e("data", chatData.toString())
                    if (chatData.senderUserID == otherUser.listUserId || chatData.senderUserID == userData?.loginUserID) {
                        list.add(
                            ChatHistoryData(
                                chatData.senderUserID, chatData.receiverUserID, chatData.message,
                                convertDate(getCurrentDate(), displayDate, alohaDate)
                            )
                        )
                        listAdapter.notifyDataSetChanged()
                        recyclerView.scrollToPosition(list.size - 1)
                    }else{
                        //show notification
                    }

                }

            } catch (e: Exception) {
                Log.e("Exception", e.toString())
            }

        }
    }

    override fun onDisconnected() {
        runOnUiThread {Log.e("Disconnected","Disconnected")  }
    }

    override fun onError(exception: Exception?) {
        runOnUiThread {  Log.e("Error","$exception")
            //Toast.makeText(this, exception?.message, Toast.LENGTH_SHORT).show()
             }
    }

    override fun onEventMessage(message: HubMessage?) {
        runOnUiThread {
//            Toast.makeText(
//                this,
//                "Event message: ${message?.target}\n${Gson().toJson(message?.arguments)}",
//                Toast.LENGTH_SHORT
//            ).show()
            Log.e("Event Message","$message")
        }
    }
}

