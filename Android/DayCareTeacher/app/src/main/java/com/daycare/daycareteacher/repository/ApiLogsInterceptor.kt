package com.daycare.daycareteacher.repository

import android.util.Log

import com.crashlytics.android.Crashlytics

import java.io.IOException

import okhttp3.Interceptor
import okhttp3.Request
import okhttp3.Response
import okhttp3.ResponseBody
import okio.Buffer
import timber.log.Timber

/*
* @ApiLogsInterceptor class use to print the logs of input and output parameters
   of the apis
 *
* */
class ApiLogsInterceptor(var token:String) : Interceptor {
    @Throws(IOException::class)
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request()
        val t1 = System.nanoTime()
        Timber.i("Sending request %s on %s%n%s", request.url(), chain.connection(), request.headers())
       Log.v("Headers", "" + request.headers())

        Log.v("Request_Parameters", "" + bodyToString(request))
        Log.v(
            "Method Type", "  " + request.method()
                    + "  " + request.url()
        )

        val requestBuilder = request.newBuilder()
            .header("Accept", "application/json")
            .header("Content-Type", "application/json")
            .header("Authorization", token)

        val response = chain.proceed(requestBuilder.build())

        val responseBody = response.body()
        val responseBodyString = response.body()!!.string()

        // now we have extracted the response body but in the process
        // we have consumed the original reponse and can't read it again
        // so we need to build a new one to return from this method

        val newResponse = response.newBuilder()
            .body(ResponseBody.create(responseBody!!.contentType(), responseBodyString.toByteArray())).build()

        val request_response =
            "Url:" + request.url() + "\n Request Parameters " + bodyToString(request) + "\n Response" + responseBodyString

        val t2 = System.nanoTime()

        if (newResponse.code() != 200) {
            Crashlytics.log(request_response)

        }


        return newResponse
    }

    private fun bodyToString(request: Request): String {

        return try {
            val copy = request.newBuilder().build()
            val buffer = Buffer()
            copy.body()!!.writeTo(buffer)
            buffer.readUtf8()
        } catch (e: IOException) {
            "did not work"
        }

    }
}