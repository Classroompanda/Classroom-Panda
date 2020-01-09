package com.daycare.daycareteacher.ui.dashboard.adapter

import android.content.Intent
import android.net.Uri
import android.support.v7.app.AlertDialog
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.bumptech.glide.Glide
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.PostListRowBinding
import com.daycare.daycareteacher.model.PostActivityStudentData
import com.daycare.daycareteacher.ui.dashboard.activities.PostActivityDetailActivity
import com.daycare.daycareteacher.ui.dashboard.fragments.postactivity.PostActivityFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.postactivity.PostActivityViewModel
import com.daycare.daycareteacher.utill.*
import net.alexandroid.utils.exoplayerhelper.ExoPlayerHelper
import net.alexandroid.utils.exoplayerhelper.ExoPlayerListener
import java.io.File

class PostAdapter( var context: PostActivityFragment,
                   var childrenList: ArrayList<PostActivityStudentData>?,
                   var date: String) : RecyclerView.Adapter<PostAdapter.BindingPostHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BindingPostHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: PostListRowBinding = PostListRowBinding.inflate(layoutInflater, parent, false)
        return BindingPostHolder(binding)
    }

    override fun getItemCount(): Int {
        return childrenList?.size!!
    }

    override fun onBindViewHolder(holder: BindingPostHolder, position: Int) {
        val binding = holder.binding


        val viewModel = PostActivityViewModel(childrenList?.get(position)!!, position)
        binding.viewModel = viewModel
        binding.img1.clipToOutline = true
        binding.txtUsername.text=childrenList?.get(position)?.studentName
        binding.txtDate.text= convertDate(childrenList?.get(position)?.postedDate!!, otherserverDate, postActivityDate)
        holder.binding.txtFavouriteCount.text = childrenList?.get(position)?.totalLikes.toString()

        Glide.with(binding.userProfilePic.context)
            .load(childrenList?.get(position)?.imagePath)
            .asBitmap()
            .placeholder(R.drawable.ic_placeholder)
            .into(holder.binding.userProfilePic)

        if(childrenList?.get(position)?.isPublic!!){
            binding.imgWorld.setImageResource(R.drawable.ic_public)
            binding.commentRL.visibility=View.GONE
        }
        else{
            binding.imgWorld.setImageResource(R.drawable.ic_private)
            binding.commentRL.visibility=View.VISIBLE
            binding.txtCommentCount.text = childrenList?.get(position)?.postComment
        }


        binding.imgOptionDelete.setOnClickListener {
            AlertDialog.Builder(it.context)
                .setTitle("Delete Activity")
                .setMessage("Are you sure you want to Delete?")
                .setPositiveButton(
                    "Yes"
                ) { dialog, id ->
                    run {
                        dialog.cancel()
                        //calenderViewModel.deleteEvent(eventList[position].id)
                        viewModel.deletePostActivity(it, Integer.valueOf(childrenList?.get(position)?.id!!), position)
                        childrenList!!.removeAt(position)
                      /*  if(AppInstance.postActivityDetailData?.size!!>1) {
                            AppInstance.postActivityDetailData?.removeAt(position)
                        }*/
                        notifyItemRemoved(position)
                    }
                }
                .setNegativeButton(
                    "No"
                ) { dialog, id -> dialog.cancel() }
                .show()

        }




        binding.txtShortDescription.text=childrenList?.get(position)?.postTitle
        binding.txtLongDescription.text=childrenList?.get(position)?.postDescription
        if(childrenList?.get(position)?.postActivityImages?.size!! >0){
            if(childrenList?.get(position)?.postActivityImages!!.size>2){
                Glide.with(binding.img1.context)
                    .load(childrenList?.get(position)?.postActivityImages!![0].imageServerPath)
                    .asBitmap()
                    .placeholder(R.drawable.ic_menu_gallery)
                    .into(holder.binding.img1)

                binding.img2.visibility=View.VISIBLE

                Glide.with(binding.img2.context)
                    .load(childrenList?.get(position)?.postActivityImages!![1].imageServerPath)
                    .asBitmap()
                    .placeholder(R.drawable.ic_menu_gallery)
                    .into(holder.binding.img2)

                Glide.with(binding.img3.context)
                    .load(childrenList?.get(position)?.postActivityImages!![2].imageServerPath)
                    .asBitmap()
                    .placeholder(R.drawable.ic_menu_gallery)
                    .into(holder.binding.img3)
            }

           else if(childrenList?.get(position)?.postActivityImages!!.size==2){
                Glide.with(binding.img1.context)
                    .load(childrenList?.get(position)?.postActivityImages!![0].imageServerPath)
                    .asBitmap()
                    .placeholder(R.drawable.ic_menu_gallery)
                    .into(holder.binding.img1)

                binding.img2.visibility=View.VISIBLE

                Glide.with(binding.img2.context)
                    .load(childrenList?.get(position)?.postActivityImages!![1].imageServerPath)
                    .asBitmap()
                    .placeholder(R.drawable.ic_menu_gallery)
                    .into(holder.binding.img2)
                binding.img3.visibility=View.GONE
            }
            else   if(childrenList?.get(position)?.postActivityImages!!.size==1){
                Glide.with(binding.img1.context)
                    .load(childrenList?.get(position)?.postActivityImages!![0].imageServerPath)
                    .asBitmap()
                    .placeholder(R.drawable.ic_menu_gallery)
                    .into(holder.binding.img1)

                binding.img3.visibility=View.GONE
                binding.img2.visibility=View.GONE
            }
        }else{
//            binding.img1.setImageResource(R.mipmap.ic_play)
            binding.img3.visibility=View.GONE
            binding.img2.visibility=View.GONE

            binding.img1.visibility = View.GONE
            binding.videoView.visibility =View.VISIBLE
            val uri = Uri.fromFile(File(childrenList?.get(position)?.postActivityVideos?.get(0)?.vedioServerPath))
            var mExoPlayerHelper: ExoPlayerHelper? = null
            mExoPlayerHelper = ExoPlayerHelper.Builder(binding.videoView.context, binding.videoView)
                .addMuteButton(false, false)
                .setUiControllersVisibility(false)
                .setAutoPlayOn(false)
                .setVideoUrls(childrenList?.get(position)?.postActivityVideos?.get(0)?.vedioServerPath)
                .createAndPrepare()
            mExoPlayerHelper.setExoPlayerEventsListener(object: ExoPlayerListener {
                override fun onLoadingStatusChanged(
                    isLoading: Boolean,
                    bufferedPosition: Long,
                    bufferedPercentage: Int
                ) {

                }

                override fun onTracksChanged(
                    currentWindowIndex: Int,
                    nextWindowIndex: Int,
                    isPlayBackStateReady: Boolean
                ) {
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
                    return false
                }

                override fun onVideoTapped() {
                    viewModel.onClickStudentCard(binding.videoView)
//                    val intent = Intent( binding.videoView.context, PostActivityDetailActivity::class.java)
//                    val data = childrenList?.get(position)
//                    intent.putExtra("data", data)
//                    binding.videoView.context.startActivity(intent)
                }

                override fun onFullScreenBtnTap() {
                }

                override fun onPlayerStateEnded(currentWindowIndex: Int) {
                }

                override fun onPlayBtnTap(): Boolean {
                    return false

                }

                override fun releaseExoPlayerCalled() {
                }

                override fun onPlayerStateIdle(currentWindowIndex: Int) {
                }

                override fun onPlayerBuffering(currentWindowIndex: Int) {

                }
            })
            mExoPlayerHelper.onActivityStart()

//            check Video
        }



    }

    class BindingPostHolder(var binding: PostListRowBinding) : RecyclerView.ViewHolder(binding.postContainer)
}