package com.daycare.daycareteacher.utill

import android.content.Context
import android.content.Intent
import android.net.Uri
import com.daycare.daycareteacher.callback.FFMpegCallback
import com.github.hiteshsondhi88.libffmpeg.ExecuteBinaryResponseHandler
import com.github.hiteshsondhi88.libffmpeg.FFmpeg
import com.github.hiteshsondhi88.libffmpeg.exceptions.FFmpegCommandAlreadyRunningException
import java.io.File
import java.io.IOException

/**
 *
 */

class VideoResizer public constructor(private val context: Context) {

    private var video: File? = null
    private var callback: FFMpegCallback? = null
    private var outputPath = ""
    private var outputFileName = ""
    private var size = ""

    fun refreshGallery(path: String, context: Context) {

        val file = File(path)
        try {
            val mediaScanIntent = Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE)
            val contentUri = Uri.fromFile(file)
            mediaScanIntent.data = contentUri
            context.sendBroadcast(mediaScanIntent)
        } catch (e: Exception) {
            e.printStackTrace()
        }

    }


    fun getConvertedFile(folder: String, fileName: String): File {
        val f = File(folder)

        if (!f.exists())
            f.mkdirs()

        return File(f.path + File.separator + fileName)
    }


    fun setFile(originalFiles: File): VideoResizer {
        this.video = originalFiles
        return this
    }

    fun setCallback(callback: FFMpegCallback): VideoResizer {
        this.callback = callback
        return this
    }

    fun setOutputPath(output: String): VideoResizer {
        this.outputPath = output
        return this
    }

    fun setOutputFileName(output: String): VideoResizer {
        this.outputFileName = output
        return this
    }

    fun setSize(output: String): VideoResizer {
        this.size = output
        return this
    }

    fun resize() {

        if (video == null || !video!!.exists()) {
            callback!!.onFailure(IOException("File not exists"))
            return
        }
        if (!video!!.canRead()) {
            callback!!.onFailure(IOException("Can't read the file. Missing permission?"))
            return
        }

        val outputLocation = getConvertedFile(outputPath, outputFileName)

        val cmd = arrayOf("-i", video!!.path, "-vf", "scale=" + size, outputLocation.path, "-hide_banner")

        try {
            FFmpeg.getInstance(context).execute(cmd, object : ExecuteBinaryResponseHandler() {
                override fun onStart() {}

                override fun onProgress(message: String?) {
                    callback!!.onProgress(message!!)
                }

                override fun onSuccess(message: String?) {
                    refreshGallery(outputLocation.path, context)
                    callback!!.onSuccess(outputLocation, OutputType.TYPE_VIDEO)

                }

                override fun onFailure(message: String?) {
                    if (outputLocation.exists()) {
                        outputLocation.delete()
                    }
                    callback!!.onFailure(IOException(message))
                }

                override fun onFinish() {
                    callback!!.onFinish()
                }
            })
        } catch (e: Exception) {
            callback!!.onFailure(e)
        } catch (e2: FFmpegCommandAlreadyRunningException) {
            callback!!.onNotAvailable(e2)
        }

    }

    companion object {


        val TAG = "VideoResizer"

        fun with(context: Context): VideoResizer {
            return VideoResizer(context)
        }
    }


}
