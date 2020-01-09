package com.daycare.daycareparent.ui.dashboard.payment

import android.app.Activity
import android.app.AlertDialog
import android.arch.lifecycle.Observer
import android.databinding.DataBindingUtil
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.widget.Toolbar
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ActivityPaymentBinding
import com.daycare.daycareparent.model.*
import com.daycare.daycareparent.utill.*
import com.stripe.android.model.Card
import com.stripe.android.Stripe
import com.stripe.android.TokenCallback
import com.stripe.android.model.Token


class PaymentActivity : AppCompatActivity() {

    lateinit var binding: ActivityPaymentBinding
    lateinit var viewModel: PaymentViewModel
    val loader = Loader()
    lateinit var toolbar: Toolbar
    var payDetails = DuePayment()
    var stripeKey = ""
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_payment)
        viewModel = PaymentViewModel()
        viewModel.getStripeDetails(binding.btnLogin)
        binding.btnLogin.setOnClickListener {
            stripePayment()
        }
        toolbar = binding.includeToolbar
        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener { finish() }
        payDetails = intent.getParcelableExtra("pay")
        binding.textView53.text = "$${payDetails.totalAmount}"
        attachObserver()
    }

    private fun stripePayment() {
        loader.startLoader(this)
        val stripe = Stripe(this, stripeKey)
        val card: Card? = binding.cardInputWidget.card
        if (card != null && card.validateCard()) {
            stripe.createToken(
                card,
                object : TokenCallback {
                    override fun onSuccess(token: Token) {
                        // Send token to your own web service
                        val data = PaymentRequest()
                        val user = PreferenceConnector.readUser(this@PaymentActivity, PreferenceConnector.USER)
                        data.agencyID = user?.agencyID
                        data.parentID = user?.releventUserID
                        data.studentID = payDetails.studentID
                        data.email = user?.emailAddress
                        data.sourceToken = token.id
                        data.tokenID = token.id
                        data.createdBy = user?.releventUserID
                        data.paymentFromDate = payDetails.invoiceFromDate
                        data.paymentToDate = payDetails.invoiceToDate
                        data.totalAmount = payDetails.totalAmount
                        data.invoiceDetailsID = payDetails.id
                        data.IsOffline = false
                        data.paymentDate = convertDate(getCurrentDate(), displayDate, serverDate)

                        viewModel.setpaymentDetails(data, binding.btnLogin)
                    }

                    override fun onError(error: Exception) {
                        showDialog(this@PaymentActivity, getString(R.string.app_name), error.localizedMessage)
                        loader.stopLoader()

                    }
                }
            )
        } else {
            showDialog(this, getString(R.string.app_name), "Please enter valid card details.")
            loader.stopLoader()
        }
    }

    private fun attachObserver() {
        viewModel.stripeKey.observe(this, Observer<StripeData> { it ->
            it?.let {
                if (it.stripePublishableKey != null) {
                    stripeKey = it.stripePublishableKey!!
                }
            }
        })

        viewModel.isLoading.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.startLoader(this)
                } else {
                    loader.stopLoader()
                }
            }

        })
//        isPaymentSuccess
        viewModel.isPaymentSuccess.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.stopLoader()
                    AlertDialog.Builder(this)
                        .setTitle(resources.getString(R.string.app_name))
                        .setMessage("Payment done successfully.")
                        .setPositiveButton(
                            "Ok"
                        ) { dialog, _ ->
                            run {
                                dialog.dismiss()
                                finish()
                            }
                        }
                        .show()

                }
            }
        })

    }
}
