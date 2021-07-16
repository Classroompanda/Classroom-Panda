package com.daycare.daycareteacher.interfaces

import androidx.fragment.app.Fragment

interface IFragmentCallback {
    fun onQuickAccessTabClicked(fragment: Fragment, nav_id: Int)
}