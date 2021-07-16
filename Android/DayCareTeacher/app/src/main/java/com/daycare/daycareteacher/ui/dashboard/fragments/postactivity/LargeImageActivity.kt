package com.daycare.daycareteacher.ui.dashboard.fragments.postactivity

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityLargeImageBinding
import com.daycare.daycareteacher.utill.showToast
import com.google.android.exoplayer2.SimpleExoPlayer
import com.google.android.exoplayer2.upstream.DataSource


class LargeImageActivity : AppCompatActivity() {

    lateinit var background: View
    var isImage = true
    lateinit var binding: ActivityLargeImageBinding
    // var mExoPlayerHelper: ExoPlayerHelper? = null
    private lateinit var simpleExoPlayer: SimpleExoPlayer
    private lateinit var mediaDataSourceFactory: DataSource.Factory



    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_large_image)

        val url = intent.getStringExtra("url")
        isImage = intent.getBooleanExtra("type", true)

        if(!url.isNullOrEmpty()) {
            if (isImage) {
                setFullScreenImage(url)
            } else {
                setVideo(url, savedInstanceState)
            }
        }else{
            showToast(this,"Unable to fetch data")
        }
        binding.close.setOnClickListener {
            finish()
        }
    }

    private fun setVideo(url: String?, savedInstanceState: Bundle?) {

        if (url?.isNotEmpty()!!) {
            binding.largeImage.visibility = View.GONE
            binding.videoView.visibility = View.VISIBLE
        /*    mExoPlayerHelper = ExoPlayerHelper.Builder(this, binding.videoView)
                .addMuteButton(false, false)
                .setUiControllersVisibility(true)
                .setRepeatModeOn(false)
                .setAutoPlayOn(false)
                .setVideoUrls(url)
                .setTagUrl("")
                .setExoPlayerEventsListener(this)
                .addSavedInstanceState(savedInstanceState)
                .addProgressBarWithColor(resources.getColor(R.color.colorAccent))
                .setFullScreenBtnVisible()
                .createAndPrepare()*/

        }
    }

    private fun setFullScreenImage(url: String) {
        Glide.with(this)
            .load(url)
            .thumbnail(0.5f)
            .crossFade()
            .diskCacheStrategy(DiskCacheStrategy.ALL)
            .fitCenter()
            .error(R.drawable.ic_menu_gallery)
            .into(binding.largeImage)

    }



   /* private fun initializePlayer() {

        simpleExoPlayer = ExoPlayerFactory.newSimpleInstance(this)

        mediaDataSourceFactory = DefaultDataSourceFactory(this, Util.getUserAgent(this, "dayCare"))

        if (AppInstance.postActivityDetailData?.get(activityPosition)?.postActivityVideos?.isNotEmpty()!!) {
            binding.postReportRv.visibility = View.GONE
            binding.videoView.visibility = View.VISIBLE
            binding.viewBg.visibility = View.VISIBLE
            val mediaSource = ProgressiveMediaSource.Factory(mediaDataSourceFactory).createMediaSource(
                Uri.parse(AppInstance.postActivityDetailData?.get(activityPosition)?.postActivityVideos!![0].vedioServerPath))

            simpleExoPlayer.prepare(mediaSource, false, false)
            simpleExoPlayer.playWhenReady = true

            binding.videoView.setShutterBackgroundColor(Color.TRANSPARENT)
            binding.videoView.player = simpleExoPlayer
            binding.videoView.requestFocus()

        }


    }

    private fun releasePlayer() {
        simpleExoPlayer.release()
    }

    public override fun onStart() {
        super.onStart()

        if (Util.SDK_INT > 23) initializePlayer()
    }

    public override fun onResume() {
        super.onResume()

        if (Util.SDK_INT <= 23) initializePlayer()
    }

    public override fun onPause() {
        super.onPause()

        if (Util.SDK_INT <= 23) releasePlayer()
    }

    public override fun onStop() {
        super.onStop()

        if (Util.SDK_INT > 23) releasePlayer()
    }*/

}

