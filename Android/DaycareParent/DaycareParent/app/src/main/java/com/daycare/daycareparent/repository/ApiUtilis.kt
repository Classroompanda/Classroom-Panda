package com.daycare.daycareparent.repository



import android.content.Context
import com.daycare.daycareparent.utill.PreferenceConnector
import com.daycare.daycareparent.utill.WebServices.WS_Staging_URL
import okhttp3.*
import retrofit2.Retrofit
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

/**
 *
 * @B ApiUtilis :  This class contain the Base url of server as well as singletone values required.
 **/


class ApiUtilis {
    companion object {

        val BASE_URL = WS_Staging_URL
        private val httpClient = OkHttpClient.Builder()
        private val builder = Retrofit.Builder()
                .baseUrl(BASE_URL).addCallAdapterFactory(RxJava2CallAdapterFactory.create())
                .addConverterFactory(GsonConverterFactory.create())


        fun getAPIService(context: Context): APIService {
            val token = "Bearer " + PreferenceConnector.readString(context, PreferenceConnector.ACCESS_TOKEN, "1234")

            val logging = ApiLogsInterceptor(token)
             httpClient.addInterceptor(logging)
             val client = httpClient.connectTimeout(30, TimeUnit.SECONDS)
                    .readTimeout(20, TimeUnit.SECONDS)
                    .writeTimeout(20, TimeUnit.SECONDS).build()
            val retrofit = builder.client(client).build()
            return retrofit.create(APIService::class.java)


        }


    }











}