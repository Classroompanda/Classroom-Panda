package com.daycare.daycareparent.ui.dashboard.adapter

import android.content.Context
import android.net.Uri
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.PostDetailRowBinding
import com.daycare.daycareparent.model.Post
import android.content.Intent
import com.daycare.daycareparent.ui.dashboard.postactivity.LargeImageActivity
import net.alexandroid.utils.exoplayerhelper.ExoPlayerHelper


class PostActivityDetailAdapter(
    var data: Post?, var context: Context
) : RecyclerView.Adapter<PostActivityDetailAdapter.BindPostActivityDetailHolder>() {


    override fun onBindViewHolder(holder: BindPostActivityDetailHolder, position: Int) {
        val binding = holder.binding
        var mExoPlayerHelper: ExoPlayerHelper


        if (data?.postActivityImages!!.isNotEmpty()) {
            binding.img1.visibility = View.VISIBLE
            binding.videoView.visibility = View.GONE
            binding.img1.clipToOutline = true
            Glide.with(binding.cardView5.context)
                .load(data?.postActivityImages!![position].imageServerPath)
                .thumbnail(0.5f)
                .crossFade()
                .diskCacheStrategy(DiskCacheStrategy.ALL)
                .fitCenter()
                .error(R.drawable.ic_menu_gallery)
                .into(binding.img1)

            binding.img1.setOnClickListener {
                val intent = Intent(it.context, LargeImageActivity::class.java)
                intent.putExtra("url", data?.postActivityImages!![position].imageServerPath)
                intent.putExtra("type", true)
                it.context.startActivity(intent)
            }


        } else if (data?.postActivityVideos?.isNotEmpty()!!) {
            binding.img1.visibility = View.GONE
//            binding.videoView.visibility = View.VISIBLE
//            binding.videoView.setVideoPath(
//
//                data?.postActivityVideos!![position].vedioServerPath
//
//            )
//            mExoPlayerHelper = ExoPlayerHelper.Builder(context, binding.videoView)
//                .addMuteButton(false, false)
//                .setUiControllersVisibility(false)
//                .setRepeatModeOn(true)
//                .setAutoPlayOn(false)
//                .setVideoUrls(data?.postActivityVideos!![position].vedioServerPath)
//                .setTagUrl(data?.postTitle)
//                .setExoPlayerEventsListener(this)
//                .setExoAdEventsListener(this)
//                .addSavedInstanceState(savedInstanceState)
//                .setThumbImageViewEnabled(this)
//                .enableLiveStreamSupport()
//                .addProgressBarWithColor(getResources().getColor(R.color.colorAccent))
//                .setFullScreenBtnVisible()
//                .setMuteBtnVisible()
//                .createAndPrepare()

        }

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BindPostActivityDetailHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: PostDetailRowBinding = PostDetailRowBinding.inflate(layoutInflater, parent, false)
        return BindPostActivityDetailHolder(binding)
    }

    override fun getItemCount(): Int {
        var listSize = 0
        if (data?.postActivityImages != null && data?.postActivityImages!!.isNotEmpty()) {
            listSize = data?.postActivityImages!!.size
        } else if (data?.postActivityVideos != null && data?.postActivityVideos!!.isNotEmpty()) {
            listSize = data?.postActivityVideos!!.size
        }
        return listSize
    }


    class BindPostActivityDetailHolder(var binding: PostDetailRowBinding) :
        RecyclerView.ViewHolder(binding.postContainer)
}


