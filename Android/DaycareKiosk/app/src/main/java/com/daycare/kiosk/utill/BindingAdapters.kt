package com.daycare.kiosk.utill

import android.graphics.Color
import android.text.Editable
import android.text.TextWatcher
import android.view.View
import android.widget.Button
import androidx.databinding.BindingAdapter
import androidx.databinding.DataBindingUtil
import com.daycare.kiosk.R
import com.daycare.kiosk.databinding.ActivityDashboardBinding
import com.daycare.kiosk.databinding.ListItemPickNDropBinding
import com.google.android.material.textfield.TextInputLayout



/*
@BindingAdapter("errorText")
fun setErrorMessage(view: TextInputLayout, errorMessage: String?) {
    view.error = errorMessage
}

@BindingAdapter("textChangeListener")
fun setTextChangeListener(view: TextInputLayout, enabled: Boolean?): Unit? {
    return view.editText?.addTextChangedListener(object : TextWatcher {
        override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {}
        override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {
            view.isErrorEnabled = s.isEmpty()
        }

        override fun afterTextChanged(s: Editable) {}
    })
}


//        for Attendance State

@BindingAdapter("app:state")
fun loadState(view: View, state: Int) {
    val binding = DataBindingUtil.findBinding<ListItemPickNDropBinding>(view)
    when (state) {
        IS_CHECKED_IN -> {
            binding?.buttonCheck!!.visibility = View.VISIBLE
            binding?.buttonCheck.text="CheckOut"
            binding.buttonbreak.visibility = View.VISIBLE
            binding.buttonbreak.text="BreakOut"
        }
        IS_BREAK_OUT -> {
            binding?.buttonCheck!!.visibility = View.VISIBLE
            binding?.buttonCheck.text="CheckOut"
            binding.buttonbreak.visibility = View.VISIBLE
            binding.buttonbreak.text="Break In"
        }

        IS_BREAK_IN -> {
            binding?.buttonCheck!!.visibility = View.VISIBLE
            binding?.buttonCheck.text="CheckOut"
            binding?.buttonCheck!!.isEnabled = false
            binding?.buttonCheck.setBackgroundColor(Color.GRAY)
            binding.buttonbreak.visibility = View.VISIBLE
            binding.buttonbreak.text="Break Out"
        }
        */
/*IS_CHECKED_OUT -> {
            binding!!.btnEdit.visibility = View.VISIBLE
            binding.btnCheckin.visibility = View.INVISIBLE
            binding.btnCheckout.visibility = View.INVISIBLE
            binding.btnCheckedOut.visibility = View.VISIBLE
            binding.absentBtn.visibility = View.INVISIBLE
        }*//*


        IS_TO_BE_CHECKED -> {

            binding?.buttonCheck!!.visibility = View.VISIBLE
            binding?.buttonCheck.text="CheckIn"
            binding.buttonbreak.visibility = View.GONE

        }

    }
}


*/



class BindingAdapters {


    companion object {
        @JvmStatic
        @BindingAdapter("errorText")
        fun setErrorMessage(view: TextInputLayout, errorMessage: String?) {
            view.error = errorMessage
        }
        @JvmStatic
        @BindingAdapter("textChangeListener")
        fun setTextChangeListener(view: TextInputLayout, enabled: Boolean?): Unit? {
            return view.editText?.addTextChangedListener(object : TextWatcher {
                override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {}
                override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {
                    view.isErrorEnabled = s.isEmpty()
                }

                override fun afterTextChanged(s: Editable) {}
            })
        }


        //        for Attendance State
        @JvmStatic
        @BindingAdapter("app:state")
        fun loadState(view: View, state: Int) {
            val binding = DataBindingUtil.findBinding<ListItemPickNDropBinding>(view)
            when (state) {
                IS_CHECKED_IN -> {
                    binding?.buttonCheck!!.visibility = View.VISIBLE
                    binding?.buttonCheck.text="CheckOut"
                    binding?.buttonCheck.setBackgroundResource(R.drawable.rounded_btn)
                    binding?.buttonbreak.setBackgroundResource(R.drawable.rounded_btn)
                    binding?.buttonCheck!!.isEnabled = true
                    binding.buttonbreak.visibility = View.VISIBLE
                    binding.buttonbreak.text="BreakOut"
                }
                IS_BREAK_OUT -> {
                    binding?.buttonCheck!!.visibility = View.VISIBLE
                    binding?.buttonCheck.text="CheckOut"
                    binding?.buttonCheck!!.isEnabled = false
                    binding?.buttonCheck.setBackgroundResource(R.drawable.rounded_disable_btn)
                    binding?.buttonbreak.setBackgroundResource(R.drawable.rounded_btn)
                    binding.buttonbreak.visibility = View.VISIBLE
                    binding.buttonbreak.text="Break In"
                }

                IS_BREAK_IN -> {
                    binding?.buttonCheck!!.visibility = View.VISIBLE
                    binding?.buttonCheck.text="CheckOut"
                    binding?.buttonCheck!!.isEnabled = true
                    binding?.buttonCheck.setBackgroundResource(R.drawable.rounded_btn)
                    binding?.buttonbreak.setBackgroundResource(R.drawable.rounded_btn)
                    binding.buttonbreak.visibility = View.VISIBLE
                    binding.buttonbreak.text="Break Out"
                }
                IS_CHECKED_OUT -> {
                    binding?.buttonCheck!!.visibility = View.VISIBLE
                    binding?.buttonCheck.text="CheckIn"
                    binding?.buttonCheck.setBackgroundResource(R.drawable.rounded_btn)
                    binding?.buttonCheck!!.isEnabled = true
                    binding.buttonbreak.visibility = View.GONE
                }
                IS_TO_BE_CHECKED -> {

                    binding?.buttonCheck!!.visibility = View.VISIBLE
                    binding?.buttonCheck.text="CheckIn"
                    binding?.buttonCheck!!.isEnabled = true
                    binding.buttonbreak.visibility = View.GONE

                }

            }
        }
    }
}


//@BindingAdapter("app:image")
//fun loadImage(view: ImageView, url: ByteArray?) {
//    if (url != null) {
//        Glide.with(view.context)
//            .load(url)
//            .asBitmap()
//            .placeholder(R.mipmap.ic_photo)
//            .into(view)
//    } else {
//        Glide.with(view.context)
//            .load("")
//            .placeholder(R.mipmap.ic_photo)
//            .into(view)
//    }
//}







