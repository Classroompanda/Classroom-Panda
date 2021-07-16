package com.daycare.daycareteacher.ui.dashboard.fragments.student


import android.os.Bundle
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout

import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.FragmentGuardianInfoBinding
import com.daycare.daycareteacher.model.GuardianData
import com.daycare.daycareteacher.ui.dashboard.adapter.GuardianListAdapter
import com.daycare.daycareteacher.utill.AppInstance


/**
 * A simple [Fragment] subclass.
 *
 */
class GuardianInfoFragment : Fragment() {

    lateinit var binding: FragmentGuardianInfoBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        val view = inflater.inflate(R.layout.fragment_guardian_info, container, false)
        binding = FragmentGuardianInfoBinding.bind(view)

        val recyclerView = binding.guardiansRv
        recyclerView.layoutManager =
            LinearLayoutManager(
                view.context,
                LinearLayout.VERTICAL,
                false
            )
        binding.guardiansRv.layoutManager = recyclerView.layoutManager

        /* val listAdapter = GuardianListAdapter()
        binding.guardiansRv.adapter = listAdapter*/
        var guardianList = AppInstance.studentDetails?.data?.guardians
      try {
            if (guardianList?.size!! > 0) {
                binding.guardiansRv.visibility = View.VISIBLE
                binding.txtError.visibility = View.GONE
                val listAdapter = GuardianListAdapter(context, AppInstance.studentDetails?.data?.guardians)
                binding.guardiansRv.adapter = listAdapter
            } else {
                binding.guardiansRv.visibility = View.GONE
                binding.txtError.visibility = View.VISIBLE

            }
        } catch (e:Exception) {
            Log.i("Error", e.toString())
          binding.guardiansRv.visibility = View.GONE
          binding.txtError.visibility = View.VISIBLE
        }


        return view
    }


}
