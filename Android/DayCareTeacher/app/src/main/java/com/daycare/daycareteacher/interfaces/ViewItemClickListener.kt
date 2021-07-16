package com.daycare.daycareteacher.interfaces

interface ViewItemClickListener<T> {

    fun onViewItemClick(t: T, position: Int, actionId: Int)
}