package com.daycare.daycareteacher.ui.dashboard.fragments.postactivity

import android.databinding.DataBindingUtil
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.View
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityLargeImageBinding
import net.alexandroid.utils.exoplayerhelper.ExoPlayerHelper
import net.alexandroid.utils.exoplayerhelper.ExoPlayerListener

class LargeImageActivity : AppCompatActivity(), ExoPlayerListener {

    lateinit var background: View
    var isImage = true
    lateinit var binding: ActivityLargeImageBinding
    var mExoPlayerHelper: ExoPlayerHelper? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_large_image)

        val url = intent.getStringExtra("url")
        isImage = intent.getBooleanExtra("type", true)
        if (isImage) {
            setFullScreenImage(url)
        } else {

            setVideo(url, savedInstanceState)
        }

        binding.close.setOnClickListener {
            finish()
        }
    }

    private fun setVideo(url: String?, savedInstanceState: Bundle?) {

        if (url?.isNotEmpty()!!) {
            binding.largeImage.visibility = View.GONE
            binding.videoView.visibility = View.VISIBLE
            mExoPlayerHelper = ExoPlayerHelper.Builder(this, binding.videoView)
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
                .createAndPrepare()

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

    override fun onSaveInstanceState(outState: Bundle) {
        mExoPlayerHelper?.onSaveInstanceState(outState)
        super.onSaveInstanceState(outState)
    }

    override fun onStart() {
        super.onStart()
        mExoPlayerHelper?.onActivityStart()
    }

    override fun onResume() {
        super.onResume()
        mExoPlayerHelper?.onActivityResume()
    }

    override fun onPause() {
        super.onPause()
        mExoPlayerHelper?.onActivityPause()
    }

    override fun onStop() {
        super.onStop()
        mExoPlayerHelper?.onActivityStop()
    }

    override fun onDestroy() {
        super.onDestroy()
        mExoPlayerHelper?.onActivityDestroy()
    }

    override fun onLoadingStatusChanged(isLoading: Boolean, bufferedPosition: Long, bufferedPercentage: Int) {

    }

    override fun onTracksChanged(currentWindowIndex: Int, nextWindowIndex: Int, isPlayBackStateReady: Boolean) {
    }

    override fun onPlayerError(errorString: String?) {
    }

    override fun onPlayerPaused(currentWindowIndex: Int) {

    }

    override fun onVideoResumeDataLoaded(window: Int, position: Long, isResumeWhenReady: Boolean) {

    }

    override fun onPlayerPlaying(currentWindowIndex: Int) {

    }

    override fun createExoPlayerCalled(isToPrepare: Boolean) {

    }

    override fun onMuteStateChanged(isMuted: Boolean) {


    }

    override fun onPauseBtnTap(): Boolean {

        return false;
    }

    override fun onVideoTapped() {

    }

    override fun onFullScreenBtnTap() {
        finish()
    }

    override fun onPlayerStateEnded(currentWindowIndex: Int) {

    }

    override fun onPlayBtnTap(): Boolean {
        return false;
    }

    override fun releaseExoPlayerCalled() {

    }

    override fun onPlayerStateIdle(currentWindowIndex: Int) {

    }

    override fun onPlayerBuffering(currentWindowIndex: Int) {

    }

}

