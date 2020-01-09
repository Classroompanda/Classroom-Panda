package com.daycare.daycareteacher.ui.dashboard.activities

import android.content.Context
import android.content.Intent
import android.databinding.DataBindingUtil
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v4.content.ContextCompat
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.Toolbar
import android.view.View
import android.widget.LinearLayout
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.PostActivityDetailBinding
import com.daycare.daycareteacher.interfaces.ILoaderCallback
import com.daycare.daycareteacher.ui.dashboard.adapter.PostActivityDetailAdapter
import com.daycare.daycareteacher.ui.dashboard.fragments.postactivity.LargeImageActivity
import com.daycare.daycareteacher.ui.dashboard.fragments.postactivity.PostActivityViewModel
import com.daycare.daycareteacher.utill.*
import kotlinx.android.synthetic.main.toolbar.view.*
import net.alexandroid.utils.exoplayerhelper.ExoAdListener
import net.alexandroid.utils.exoplayerhelper.ExoPlayerHelper
import net.alexandroid.utils.exoplayerhelper.ExoPlayerListener

class PostActivityDetailActivity : AppCompatActivity(), ILoaderCallback, ExoPlayerListener, ExoAdListener {
    override fun onAdPause() {
    }

    override fun onAdResume() {
    }

    override fun onAdClicked() {
    }

    override fun onAdPlay() {
    }

    override fun onAdTapped() {
    }

    override fun onAdEnded() {
    }

    override fun onAdError() {
    }

    lateinit var binding: PostActivityDetailBinding
    lateinit var toolbar: Toolbar
    var activityPosition: Int = 0
    var dateSelect: String = ""
    var viewModel = PostActivityViewModel()
    var loader = Loader()
    lateinit var listAdapter: PostActivityDetailAdapter
    var mExoPlayerHelper: ExoPlayerHelper? = null


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.post_activity_detail)
        activityPosition = Integer.parseInt(intent.getStringExtra("POSITION"))
        dateSelect = intent.getStringExtra("SelectedDate")
        initVideoView(savedInstanceState)
        val recyclerView = binding.postReportRv
        setUpToolBar()
        recyclerView.layoutManager = LinearLayoutManager(this, LinearLayout.VERTICAL, false)
        binding.postReportRv.layoutManager = recyclerView.layoutManager

        binding.txtUsername.text = AppInstance.postActivityDetailData?.get(activityPosition)?.studentName
        binding.txtDate.text = convertDate(
            AppInstance.postActivityDetailData?.get(activityPosition)?.postedDate!!,
            otherserverDate,
            postActivityDate
        )
        binding.txtShortDescription.text = AppInstance.postActivityDetailData?.get(activityPosition)?.postTitle
        binding.txtLongDescription.text = AppInstance.postActivityDetailData?.get(activityPosition)?.postDescription
        if (AppInstance.postActivityDetailData?.get(activityPosition)?.isPublic!!) {
            binding.imgWorld.setImageResource(R.drawable.ic_public)
        } else {
            binding.imgWorld.setImageResource(R.drawable.ic_private)
        }

        viewModel = PostActivityViewModel()
        binding.viewModel = viewModel

        Glide.with(binding.userProfilePic.context)
            .load(AppInstance.postActivityDetailData?.get(activityPosition)?.imagePath)
            .asBitmap()
            .placeholder(R.drawable.ic_placeholder)
            .into(binding.userProfilePic)


        /*  val listAdapter = RecentActivityAdapter()
          binding.recentActivityRv.adapter = listAdapter
  */
        /*val listAdapter = RecentActivityAdapter(this, AppInstance.allDailySheetStidentList?.data?.get(activityPosition)?.activityDetail)
        binding.recentActivityRv.adapter = listAdapter*/

        listAdapter = PostActivityDetailAdapter(
            this, activityPosition,
            AppInstance.postActivityDetailData
        )
        binding.postReportRv.adapter = listAdapter

    }

    private fun initVideoView(savedInstanceState: Bundle?) {
        if (AppInstance.postActivityDetailData?.get(activityPosition)?.postActivityVideos?.isNotEmpty()!!) {
            binding.postReportRv.visibility = View.GONE
            binding.videoView.visibility = View.VISIBLE
            binding.viewBg.visibility = View.VISIBLE
            mExoPlayerHelper = ExoPlayerHelper.Builder(this, binding.videoView)
                .addMuteButton(false, false)
                .setUiControllersVisibility(true)
                .setRepeatModeOn(false)
                .setAutoPlayOn(false)
                .setVideoUrls(AppInstance.postActivityDetailData?.get(activityPosition)?.postActivityVideos!![0].vedioServerPath)
                .setTagUrl("")
                .setExoAdEventsListener(this)
                .setExoPlayerEventsListener(this)
                .addSavedInstanceState(savedInstanceState)
                .addProgressBarWithColor(ContextCompat.getColor(this, R.color.colorAccent))
                .setFullScreenBtnVisible()
                .createAndPrepare()

            mExoPlayerHelper?.onActivityStart()
        }

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

//    override fun onSaveInstanceState(outState: Bundle) {
//        if (mExoPlayerHelper != null) {
//            mExoPlayerHelper?.onSaveInstanceState(outState)
//        }
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
        intent.putExtra(
            "url",
            AppInstance.postActivityDetailData?.get(activityPosition)?.postActivityVideos!![0].vedioServerPath
        )
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
