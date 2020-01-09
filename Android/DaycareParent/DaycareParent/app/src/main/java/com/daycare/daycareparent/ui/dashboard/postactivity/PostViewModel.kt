package com.daycare.daycareparent.ui.dashboard.postactivity

import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.ViewModel
import android.content.Context
import android.databinding.DataBindingUtil
import android.util.Log
import android.view.View
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ListItemPostBinding
import com.daycare.daycareparent.model.*
import com.daycare.daycareparent.repository.ApiUtilis
import com.daycare.daycareparent.repository.ErrorModel
import com.daycare.daycareparent.repository.NetworkManager
import com.daycare.daycareparent.repository.ResponseCodes.Companion.Success
import com.daycare.daycareparent.repository.ServiceListener
import com.daycare.daycareparent.utill.AppInstance
import com.daycare.daycareparent.utill.showDialog

class PostViewModel : ViewModel() {

    val isLoading = MutableLiveData<Boolean>()
    val postApiResponse = MutableLiveData<Posts>()
    val isCommentAdded = MutableLiveData<BaseModel>()


    //    Public Posts
    fun getPostActivityData(isPublic: Boolean, data: ParentChild, context: Context) {
        if (isLoading.value != true) {
            isLoading.value = true
            val body = Post()
            val manager = NetworkManager()
            body.agencyID = data.agencyID
            if (isPublic) {
                body.studentID =0
            } else {
                body.studentID = data.studentId
            }

            body.isPublic = isPublic
            manager.createApiRequest(ApiUtilis.getAPIService(context).getChildsPosts(body), object :
                ServiceListener<Posts> {
                override fun getServerResponse(response: Posts, requestcode: Int) {

//                AppInstance.postActivityStudentList = response
                    if (isPublic) {
                        AppInstance.publicPosts = response
                    } else {
                        AppInstance.privatePosts = response
                    }
                    Log.i("Response GetAttendence=", response.message.toString())
                    postApiResponse.value = response
                    isLoading.value = false
                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    isLoading.value = false
                }
            })
        }

    }

    fun addComment(data: PostDataRequest, view: View) {
        if (isLoading.value == false) {
            isLoading.value = true
            val manager = NetworkManager()

            manager.createApiRequest(ApiUtilis.getAPIService(view.context).saveImageLikedInfo(data), object :
                ServiceListener<BaseModel> {
                override fun getServerResponse(response: BaseModel, requestcode: Int) {

//                AppInstance.postActivityStudentList = response
                    if (response.statusCode == Success) {
                        Log.i("Response GetAttendence=", response.message.toString())
                        isCommentAdded.value = response
                        val bind = DataBindingUtil.findBinding<ListItemPostBinding>(view!!)
//                        bind?.editText?.visibility = View.GONE
//                        bind?.imageButton3?.visibility = View.GONE
//                        bind?.viewComment?.visibility = View.VISIBLE
//                        bind?.viewComment?.text = data.comment
                        bind?.txtFavouriteCount?.text =
                            (bind?.txtFavouriteCount?.text.toString().toInt().plus(1)).toString()
                        bind?.likeBtn?.isEnabled = false
                    //    bind?.likeBtn?.setImageResource(R.drawable.ic_heart)
                       // bind?.likeBtn?.ispos = false
                       // posts[position].isPostALreadyLiked
                    }
                    isLoading.value = false

                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    showDialog(view?.context!!, view.context?.getString(R.string.app_name)!!, error.error_message)
                    isLoading.value = false
                }
            })
        }
    }

    fun addCommentVideo(data: PostDataRequest, view: View) {
        if (isLoading.value == false) {
            isLoading.value = true
            val manager = NetworkManager()

            manager.createApiRequest(ApiUtilis.getAPIService(view.context).saveVideoLikedInfo(data), object :
                ServiceListener<BaseModel> {
                override fun getServerResponse(response: BaseModel, requestcode: Int) {

//                AppInstance.postActivityStudentList = response
                    if (response.statusCode == Success) {
                        Log.i("Response GetAttendence=", response.message.toString())
                        isCommentAdded.value = response
                        val bind = DataBindingUtil.findBinding<ListItemPostBinding>(view!!)
//                        bind?.editText?.visibility = View.GONE
//                        bind?.imageButton3?.visibility = View.GONE
//                        bind?.viewComment?.visibility = View.VISIBLE
//                        bind?.viewComment?.text = data.comment
                        bind?.txtFavouriteCount?.text =
                            (bind?.txtFavouriteCount?.text.toString().toInt().plus(1)).toString()
                        bind?.likeBtn?.isEnabled = false
                    }
                    isLoading.value = false

                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    showDialog(view?.context!!, view.context?.getString(R.string.app_name)!!, error.error_message)
                    isLoading.value = false
                }
            })
        }
    }

}