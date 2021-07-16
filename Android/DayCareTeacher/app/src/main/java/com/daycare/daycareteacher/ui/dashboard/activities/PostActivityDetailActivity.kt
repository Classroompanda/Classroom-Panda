package com.daycare.daycareteacher.ui.dashboard.activities

import android.content.pm.ActivityInfo
import android.graphics.Color
import android.net.Uri
import android.os.Bundle
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.core.content.ContextCompat
import androidx.databinding.DataBindingUtil
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.PostActivityDetailBinding
import com.daycare.daycareteacher.interfaces.ILoaderCallback
import com.daycare.daycareteacher.ui.dashboard.adapter.PostActivityDetailAdapter
import com.daycare.daycareteacher.ui.dashboard.fragments.postactivity.PostActivityViewModel
import com.daycare.daycareteacher.utill.*
import com.google.android.exoplayer2.ExoPlayerFactory
import com.google.android.exoplayer2.SimpleExoPlayer
import com.google.android.exoplayer2.source.ProgressiveMediaSource
import com.google.android.exoplayer2.upstream.DataSource
import com.google.android.exoplayer2.upstream.DefaultDataSourceFactory
import com.google.android.exoplayer2.util.Util
import kotlinx.android.synthetic.main.toolbar.view.*

class PostActivityDetailActivity : AppCompatActivity(), ILoaderCallback,View.OnClickListener{

    lateinit var binding: PostActivityDetailBinding
    lateinit var toolbar: Toolbar
    var activityPosition: Int = 0
    var dateSelect: String = ""
    var viewModel = PostActivityViewModel()
    var loader = Loader()
    private var fullscreen = false
    lateinit var listAdapter: PostActivityDetailAdapter
    private lateinit var fullscreenButton : ImageView
    private  var simpleExoPlayer: SimpleExoPlayer?= null
    private lateinit var mediaDataSourceFactory: DataSource.Factory

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.post_activity_detail)
        activityPosition = Integer.parseInt(intent.getStringExtra("POSITION"))
        dateSelect = intent.getStringExtra("SelectedDate")
        //initVideoView(savedInstanceState)
        val recyclerView = binding.postReportRv
        setUpToolBar()
        recyclerView.layoutManager =
            LinearLayoutManager(
                this, RecyclerView.VERTICAL,
                false
            )
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
          binding.recentActivityRv.adapter = listAdapter*/

        /*val listAdapter = RecentActivityAdapter(this, AppInstance.allDailySheetStidentList?.data?.get(activityPosition)?.activityDetail)
        binding.recentActivityRv.adapter = listAdapter*/

        initializePlayer()

        listAdapter = PostActivityDetailAdapter(
            this, activityPosition,
            AppInstance.postActivityDetailData
        )
        binding.postReportRv.adapter = listAdapter
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

    /* override fun onFullScreenBtnTap() {
         val intent = Intent(this, LargeImageActivity::class.java)
         intent.putExtra(
             "url",
             AppInstance.postActivityDetailData?.get(activityPosition)?.postActivityVideos!![0].vedioServerPath
         )
         intent.putExtra("type", false)
         startActivity(intent)
     }*/

    private fun initializePlayer() {
        val params =  binding.videoView.layoutParams as LinearLayout.LayoutParams
        params.width = ViewGroup.LayoutParams.MATCH_PARENT
        params.height = (200 * applicationContext.resources.displayMetrics.density).toInt()
        binding.videoView.layoutParams = params

        releasePlayer()

        simpleExoPlayer = null
        simpleExoPlayer = ExoPlayerFactory.newSimpleInstance(this)
        mediaDataSourceFactory = DefaultDataSourceFactory(this, Util.getUserAgent(this, "dayCare"))

        if (AppInstance.postActivityDetailData?.get(activityPosition)?.postActivityVideos?.isNotEmpty()!!) {
            binding.postReportRv.visibility = View.GONE
            binding.videoView.visibility = View.VISIBLE

            val mediaSource = ProgressiveMediaSource.Factory(mediaDataSourceFactory).createMediaSource(
                Uri.parse(AppInstance.postActivityDetailData?.get(activityPosition)?.postActivityVideos!![0].vedioServerPath))

            simpleExoPlayer?.prepare(mediaSource, false, false)
            simpleExoPlayer?.playWhenReady = true

            binding.videoView.setShutterBackgroundColor(Color.TRANSPARENT)
            binding.videoView.player = simpleExoPlayer
            binding.videoView.requestFocus()

            fullscreenButton = binding.videoView.findViewById<View>(R.id.exo_fullscreen_icon) as ImageView
            fullscreenButton.setOnClickListener(this)
        }
    }

    private fun releasePlayer() {
        if (simpleExoPlayer != null) {
            simpleExoPlayer!!.stop()
            simpleExoPlayer!!.release()
            simpleExoPlayer = null
        }
        // simpleExoPlayer.release()
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
    }

    override fun onClick(p0: View?) {
        fullscreenButton.setOnClickListener {
            if (fullscreen) {
                binding.headerLayout.visibility = View.VISIBLE
                binding.headerView.visibility = View.VISIBLE
                binding.middleLayout.visibility = View.VISIBLE
                binding.mView.visibility = View.VISIBLE

                fullscreenButton.setImageDrawable(ContextCompat.getDrawable(this, R.drawable.ic_fullscreen_open))
                window.decorView.systemUiVisibility = View.SYSTEM_UI_FLAG_VISIBLE

                requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT
                val params =  binding.videoView.layoutParams as LinearLayout.LayoutParams
                params.width = ViewGroup.LayoutParams.MATCH_PARENT
                params.height = (200 * applicationContext.resources.displayMetrics.density).toInt()
                binding.videoView.layoutParams = params
                fullscreen = false
            } else {
                binding.headerLayout.visibility = View.GONE
                binding.headerView.visibility = View.GONE
                binding.middleLayout.visibility = View.GONE
                binding.mView.visibility = View.GONE

                fullscreenButton.setImageDrawable(ContextCompat.getDrawable(this, R.drawable.ic_fullscreen_close))
                window.decorView.systemUiVisibility = (View.SYSTEM_UI_FLAG_FULLSCREEN
                        or View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                        or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION)

                requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE
                val params =  binding.videoView.layoutParams as LinearLayout.LayoutParams
                params.width = ViewGroup.LayoutParams.MATCH_PARENT
                params.height = ViewGroup.LayoutParams.MATCH_PARENT
                binding.videoView.layoutParams = params
                fullscreen = true
            }
        }
    }
}
