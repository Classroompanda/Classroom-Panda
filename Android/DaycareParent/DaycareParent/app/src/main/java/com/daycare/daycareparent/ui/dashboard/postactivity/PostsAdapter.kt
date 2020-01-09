package com.daycare.daycareparent.ui.dashboard.postactivity

import android.content.Intent
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.bumptech.glide.Glide
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ListItemPostBinding
import com.daycare.daycareparent.model.Post
import com.daycare.daycareparent.model.PostDataRequest
import com.daycare.daycareparent.ui.dashboard.activities.PostActivityDetailActivity
import com.daycare.daycareparent.utill.OptionConstant.IMAGE
import com.daycare.daycareparent.utill.OptionConstant.VIDEO
import com.daycare.daycareparent.utill.TaskId.PRIVATE
import com.daycare.daycareparent.utill.*
import android.net.Uri
import net.alexandroid.utils.exoplayerhelper.ExoPlayerHelper
import net.alexandroid.utils.exoplayerhelper.ExoPlayerListener
import java.io.File
import java.lang.Exception


class PostsAdapter(var posts: List<Post>, var state: Int) : RecyclerView.Adapter<PostsAdapter.BindingPostsHolder>() {

    lateinit var comment: Comment
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BindingPostsHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: ListItemPostBinding = ListItemPostBinding.inflate(layoutInflater, parent, false)
        return BindingPostsHolder(binding)
    }

    override fun getItemCount(): Int {
        return posts.size
    }

    override fun onBindViewHolder(holder: BindingPostsHolder, position: Int) {
        val binding = holder.binding

        holder.binding.txtUsername.text = posts[position].studentName
        holder.binding.txtDate.text = convertDate(posts[position].createdDate!!, alohaDate, incidentDisplayDate)
        holder.binding.txtLongDescription.text = posts[position].postDescription
        holder.binding.txtShortDescription.text = posts[position].postTitle
        holder.binding.txtFavouriteCount.text = posts[position].totalLikes.toString()
       try {
           if (posts[position].isPostALreadyLiked!!) {
               holder.binding.likeBtn.setImageResource(R.drawable.ic_heart)
           }
       }
       catch(e:Exception){
           holder.binding.likeBtn.setImageResource(R.drawable.selected_like_icon)
       }



//        holder.binding.txtCommentCount.text = posts[position].commentCount.toString()

        Glide.with(binding.userProfilePic.context)
            .load(posts[position].imagePath)
            .asBitmap()
            .placeholder(R.drawable.ic_placeholder)
            .into(holder.binding.userProfilePic)

        if (posts[position].postActivityImages != null && posts[position].postActivityImages?.size!! > 0) {


            if (posts[position].postActivityImages?.size!! >= 1) {
                Glide.with(binding.img1.context)
                    .load(posts[position].postActivityImages!![0].imageServerPath)
                    .asBitmap()
                    .placeholder(R.drawable.ic_menu_gallery)
                    .into(holder.binding.img1)
                binding.img2.visibility = View.GONE
                binding.img3.visibility = View.GONE
            }
            if (posts[position].postActivityImages?.size!! >= 2) {
                Glide.with(binding.img2.context)
                    .load(posts[position].postActivityImages!![1].imageServerPath)
                    .asBitmap()
                    .placeholder(R.drawable.ic_menu_gallery)
                    .into(holder.binding.img2)
                binding.img2.visibility = View.VISIBLE
                binding.img3.visibility = View.GONE
            }
            if (posts[position].postActivityImages?.size!! == 3) {
                Glide.with(binding.img3.context)
                    .load(posts[position].postActivityImages!![2].imageServerPath)
                    .asBitmap()
                    .placeholder(R.drawable.ic_menu_gallery)
                    .into(holder.binding.img3)
                binding.img3.visibility = View.VISIBLE
            }

        } else if (posts[position].postActivityVideos != null || posts[position].postActivityVideos?.isNotEmpty()!!) {
            binding.img1.visibility = View.GONE
            binding.videoView.visibility =View.VISIBLE
            val uri = Uri.fromFile(File(posts[position].postActivityVideos?.get(0)?.vedioServerPath))
            var mExoPlayerHelper: ExoPlayerHelper? = null
//            Glide.with(binding.cardView5.context)
//                .load(uri)
//                .crossFade()
//                .thumbnail(0.1f)
//                .error(R.drawable.ic_youtube_play_button)
//                .into(binding.img1)
            mExoPlayerHelper = ExoPlayerHelper.Builder(binding.videoView.context, binding.videoView)
                .addMuteButton(false, false)
                .setUiControllersVisibility(false)
                .setAutoPlayOn(false)
                .setVideoUrls(posts[position].postActivityVideos?.get(0)?.vedioServerPath)
                .createAndPrepare()
            mExoPlayerHelper.setExoPlayerEventsListener(object:ExoPlayerListener{
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
                    val intent = Intent( binding.videoView.context, PostActivityDetailActivity::class.java)
                    val data = posts[position]
                    intent.putExtra("data", data)
                    binding.videoView.context.startActivity(intent)
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

            binding.img2.visibility = View.GONE
            binding.img3.visibility = View.GONE
//            check Video
        } else {
            binding.img1.visibility = View.GONE
            binding.img2.visibility = View.GONE
            binding.img3.visibility = View.GONE
        }
        if (state == PRIVATE) {

            binding.imglock.visibility = View.VISIBLE
            binding.imgWorld.visibility = View.GONE
//            binding.comment.visibility = View.VISIBLE

//            if (posts[position].postComment.isNullOrBlank()) {
//                binding.editText.visibility = View.VISIBLE
//                binding.imageButton3.visibility = View.VISIBLE
//                binding.viewComment.visibility = View.GONE
//            } else {
//                binding.editText.visibility = View.GONE
//                binding.imageButton3.visibility = View.GONE
//                binding.viewComment.visibility = View.VISIBLE
//                binding.viewComment.text = posts[position].postComment
//            }
        } else {
            binding.imglock.visibility = View.GONE
            binding.imgWorld.visibility = View.VISIBLE
//            binding.comment.visibility = View.GONE
//            binding.commentRL.visibility = View.GONE
        }

//        binding.imageButton3.setOnClickListener {
//            if (!binding.editText.text.isNullOrBlank()) {
//                val data = PostDataRequest()
//                val state: Int
//
//                data.agencyID = posts[position].agencyID
//                data.comment = binding.editText.text.toString()
//                data.likeCount = posts[position].postLikeCount
//                data.createdBy = PreferenceConnector.readUser(it.context,PreferenceConnector.USER)?.loginUserID
//                data.isActive = true
//                if (posts[position].postActivityImages != null && posts[position].postActivityImages?.isNotEmpty()!!) {
//                    data.postActivitiesID = posts[position].postActivityImages?.get(0)?.postActivitiesID
//                    data.postActivityImagesID = posts[position].postActivityImages?.get(0)?.id
//                    state = IMAGE
//                } else {
//                    data.postActivitiesID = posts[position].postActivityVideos?.get(0)?.postActivitiesID
//                    data.postActivityVideosID = posts[position].postActivityVideos?.get(0)?.id
//                    state = VIDEO
//                }
//                data.studentID = posts[position].studentID
//
//                comment.onCommentSend(data, holder.binding.postContainer, state)
//            } else {
//                showDialog(it.context, it.context.getString(R.string.app_name), "Please enter comment")
//            }
//        }
        binding.likeBtn.setOnClickListener {

            val data = PostDataRequest()
            val state: Int
            data.agencyID = posts[position].agencyID
            data.comment = posts[position].postComment
            data.likeCount = 1
            data.createdBy = PreferenceConnector.readUser(it.context,PreferenceConnector.USER)?.loginUserID
//                data.id = posts[position].id
            data.isActive = true
            if (posts[position].postActivityImages != null && posts[position].postActivityImages?.isNotEmpty()!!) {
                data.postActivitiesID = posts[position].postActivityImages?.get(0)?.postActivitiesID
                data.postActivityImagesID = posts[position].postActivityImages?.get(0)?.id
                state = IMAGE
            } else {
                data.postActivitiesID = posts[position].postActivityVideos?.get(0)?.postActivitiesID
                data.postActivityVideosID = posts[position].postActivityVideos?.get(0)?.id
                state = VIDEO
            }
            data.studentID = posts[position].studentID
            comment.onLikeSend(data, holder.binding.postContainer, state)

        }

        binding.middleLayout.setOnClickListener {
            val intent = Intent(it.context, PostActivityDetailActivity::class.java)
            val data = posts[position]
            intent.putExtra("data", data)
            it.context.startActivity(intent)
            }
        binding.img1.setOnClickListener {
            val intent = Intent(it.context, PostActivityDetailActivity::class.java)
            val data = posts[position]
            intent.putExtra("data", data)
            it.context.startActivity(intent)
        }
        binding.img2.setOnClickListener {
            val intent = Intent(it.context, PostActivityDetailActivity::class.java)
            val data = posts[position]
            intent.putExtra("data", data)
            it.context.startActivity(intent)
        }
        binding.img3.setOnClickListener {
            val intent = Intent(it.context, PostActivityDetailActivity::class.java)
            val data = posts[position]
            intent.putExtra("data", data)
            it.context.startActivity(intent)
        }
    }

    fun listner(comment: Comment) {
        this.comment = comment
    }

    interface Comment {
        fun onCommentSend(
            data: PostDataRequest,
            view: View,
            state: Int
        )

        fun onLikeSend(
            data: PostDataRequest,
            view: View,
            state: Int
        )
    }

    class BindingPostsHolder(var binding: ListItemPostBinding) : RecyclerView.ViewHolder(binding.postContainer)
}