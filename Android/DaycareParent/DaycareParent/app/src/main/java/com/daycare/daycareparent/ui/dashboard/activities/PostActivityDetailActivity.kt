package com.daycare.daycareparent.ui.dashboard.activities

import android.content.Intent
import android.databinding.DataBindingUtil
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.Toolbar
import android.view.View
import android.widget.LinearLayout
import com.bumptech.glide.Glide
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.PostActivityDetailBinding
import com.daycare.daycareparent.interfaces.ILoaderCallback
import com.daycare.daycareparent.model.Post
import com.daycare.daycareparent.ui.dashboard.adapter.PostActivityDetailAdapter
import com.daycare.daycareparent.ui.dashboard.fragments.postactivity.PostActivityViewModel
import com.daycare.daycareparent.ui.dashboard.postactivity.LargeImageActivity
import com.daycare.daycareparent.utill.*
import kotlinx.android.synthetic.main.toolbar.view.*
import net.alexandroid.utils.exoplayerhelper.ExoPlayerHelper
import net.alexandroid.utils.exoplayerhelper.ExoPlayerListener


class PostActivityDetailActivity : AppCompatActivity(), ILoaderCallback, ExoPlayerListener {

    lateinit var binding: PostActivityDetailBinding
    lateinit var toolbar: Toolbar
    var viewModel = PostActivityViewModel()
    var loader = Loader()
    lateinit var listAdapter: PostActivityDetailAdapter
    var postData: Post? = null
    var mExoPlayerHelper: ExoPlayerHelper? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.post_activity_detail)
        postData = intent.getParcelableExtra("data")
        setUpToolBar()
        setData()
        initVideoView(savedInstanceState)
        viewModel = PostActivityViewModel()
        binding.viewModel = viewModel

        val recyclerView = binding.postReportRv
        recyclerView.layoutManager = LinearLayoutManager(this, LinearLayout.VERTICAL, false)
        binding.postReportRv.layoutManager = recyclerView.layoutManager
        listAdapter = PostActivityDetailAdapter(postData, this)
        binding.postReportRv.adapter = listAdapter

    }

    private fun initVideoView(savedInstanceState: Bundle?) {
        if (postData?.postActivityVideos?.isNotEmpty()!!) {
            binding.postReportRv.visibility = View.GONE
            binding.videoView.visibility = View.VISIBLE
            binding.viewBg.visibility = View.VISIBLE
            mExoPlayerHelper = ExoPlayerHelper.Builder(this, binding.videoView)
                .addMuteButton(false, false)
                .setUiControllersVisibility(true)
                .setRepeatModeOn(false)
                .setAutoPlayOn(false)
                .setVideoUrls(postData?.postActivityVideos!![0].vedioServerPath)
                .setTagUrl("")
                .setExoPlayerEventsListener(this)
                .addSavedInstanceState(savedInstanceState)
                .addProgressBarWithColor(resources.getColor(R.color.colorAccent))
                .setFullScreenBtnVisible()
                .createAndPrepare()
            mExoPlayerHelper?.onActivityStart()
        }

    }

//    override fun onSaveInstanceState(outState: Bundle) {
//        mExoPlayerHelper?.onSaveInstanceState(outState)
//        super.onSaveInstanceState(outState)
//    }

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

    private fun setData() {
        binding.txtUsername.text = postData?.studentName
        binding.txtDate.text = convertDate(
            postData?.postedDate!!,
            otherserverDate,
            incidentDisplayDate
        )
        binding.txtShortDescription.text = postData?.postTitle
        binding.txtLongDescription.text = postData?.postDescription
        if (postData?.isPublic!!) {
            binding.imgWorld.setImageResource(R.drawable.ic_public)
        } else {
            binding.imgWorld.setImageResource(R.drawable.ic_private)
        }
        Glide.with(binding.userProfilePic.context)
            .load(postData?.imagePath)
            .asBitmap()
            .placeholder(R.drawable.ic_placeholder)
            .into(binding.userProfilePic)

    }

    private fun setUpToolBar() {
        toolbar = binding.include.toolbar
        toolbar.headerTxt.text = getString(R.string.dailysheetdetail)
        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener { finish() }
    }

    override fun startLoader(value: Boolean) {
        if (value) {
            this.let { loader.startLoader(it) }
        } else {
            loader.stopLoader()
        }
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
        val intent = Intent(this, LargeImageActivity::class.java)
        intent.putExtra("url", postData?.postActivityVideos!![0].vedioServerPath)
        intent.putExtra("type", false)
        startActivity(intent)
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
