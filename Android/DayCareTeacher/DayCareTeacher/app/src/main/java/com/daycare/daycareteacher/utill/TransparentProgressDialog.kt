/**
 * @author     Anurag Sethi <anurags></anurags>@smartdatainc.net>
 * @version 1.0.0
 * @since 2014-07-28
 */
package com.daycare.daycareteacher.utill

import android.app.Dialog
import android.content.Context
import android.view.Gravity
import android.view.WindowManager
import android.widget.ImageView
import com.daycare.daycareteacher.R



class TransparentProgressDialog

(context: Context) : Dialog(context, R.style.TransparentProgressDialog) {

    private val iv: ImageView? = null

    init {
        val wlmp = window!!.attributes
        wlmp.gravity = Gravity.CENTER_HORIZONTAL
        window!!.attributes = wlmp
        setTitle(null)
        setCancelable(false)
        setOnCancelListener(null)
        setContentView(R.layout.progress_bar_layout)
    }

    override fun show() {
        super.show()

    }


    override fun dismiss() {
        super.dismiss()

    }
}