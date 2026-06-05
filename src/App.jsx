import { useState } from "react";

import { supabase } from "./lib/supabase";

import "./App.css";

const emptyForm = {

  business_type: "",

  management_method: "",

  time_waster: "",

  mistake_source: "",

  biggest_problem: "",

  desired_feature: "",

  saves: "",

  would_pay: "",

  monthly_budget: "",

  contact_method: "",

  phone_number: "",

};

function App() {

  const [formData, setFormData] = useState(emptyForm);

  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });

  };

  const submitSurvey = async (e) => {

    e.preventDefault();

    setLoading(true);

    setStatus("");

    const { error } = await supabase

      .from("survey_responses")

      .insert([formData]);

    if (error) {

      setStatus("حدث خطأ أثناء الإرسال. حاول مرة أخرى.");

      console.error(error);

    } else {

      setStatus("شكراً لك! تم إرسال الاستبيان بنجاح.");

      setFormData(emptyForm);

    }

    setLoading(false);

  };

  return (

    <main className="page" dir="rtl">

      <section className="hero">

        <span className="badge">استبيان سريع</span>

        <h1>MotoHub Lebanon</h1>

        <p>

          نُجري دراسة لفهم التحديات اليومية التي تواجه ورش الدراجات النارية

          وموردي قطع الغيار وشركات التوصيل في لبنان.

        </p>

      </section>

      <section className="card">

        <h2>ساعدنا نفهم المشكلة الحقيقية</h2>

        <form onSubmit={submitSurvey} className="form">

          <div className="field">

            <label>ما نوع عملك؟</label>

            <select name="business_type" value={formData.business_type} onChange={handleChange} required>

              <option value="">اختر...</option>

              <option value="Garage">ورشة دراجات نارية</option>

              <option value="Supplier">مورد قطع غيار</option>

              <option value="Dealer">معرض بيع دراجات</option>

              <option value="Fleet">شركة توصيل</option>

              <option value="Rider">سائق دليفري</option>

            </select>

          </div>

          <div className="field">

            <label>كيف تدير أعمالك اليوم؟</label>

            <select name="management_method" value={formData.management_method} onChange={handleChange} required>

              <option value="">اختر...</option>

              <option value="Paper">ورق</option>

              <option value="Notebook">دفتر</option>

              <option value="Excel">Excel</option>

              <option value="WhatsApp">WhatsApp</option>

              <option value="Software">نظام إلكتروني</option>

            </select>

          </div>

          <div className="field">

            <label>ما أكثر شيء يضيع وقتك يومياً؟</label>

            <select name="time_waster" value={formData.time_waster} onChange={handleChange} required>

              <option value="">اختر...</option>

              <option value="Calls">المكالمات</option>

              <option value="WhatsApp">رسائل واتساب</option>

              <option value="Customers">البحث عن معلومات الزبائن</option>

              <option value="Repairs">متابعة الإصلاحات</option>

              <option value="Parts">البحث عن قطع الغيار</option>

              <option value="Inventory">إدارة المخزون</option>

              <option value="Payments">متابعة الدفعات والديون</option>

            </select>

          </div>

          <div className="field">

            <label>ما أكثر سبب للأخطاء؟</label>

            <select name="mistake_source" value={formData.mistake_source} onChange={handleChange} required>

              <option value="">اختر...</option>

              <option value="Communication">سوء التواصل مع الزبائن</option>

              <option value="LostInfo">ضياع المعلومات</option>

              <option value="Inventory">مشاكل المخزون</option>

              <option value="ForgottenJobs">نسيان أعمال الصيانة</option>

              <option value="Payments">متابعة الدفعات والديون</option>

              <option value="SupplierDelays">تأخير قطع الغيار من الموردين</option>

            </select>

          </div>

          <div className="field">

            <label>ما هي أكبر مشكلة تواجهك حالياً؟</label>

            <textarea

              name="biggest_problem"

              value={formData.biggest_problem}

              onChange={handleChange}

              placeholder="اكتب المشكلة هنا..."

              rows="5"

              required

            />

          </div>

          <div className="field">

            <label>إذا كان لديك حل واحد فقط، ماذا تريد أن ينظم لك؟</label>

            <select name="desired_feature" value={formData.desired_feature} onChange={handleChange} required>

              <option value="">اختر...</option>

              <option value="CustomerHistory">سجل الزبائن والصيانة</option>

              <option value="RepairTracking">متابعة الإصلاحات داخل الورشة</option>

              <option value="Inventory">المخزون وقطع الغيار</option>

              <option value="SupplierSearch">البحث عن قطع الغيار عند الموردين</option>

              <option value="Payments">الفواتير والدفعات والديون</option>

              <option value="BikeSales">بيع وشراء الدراجات</option>

            </select>

          </div>

          <div className="field">

            <label>هل حل هذه المشكلة يوفر؟</label>

            <select name="saves" value={formData.saves} onChange={handleChange} required>

              <option value="">اختر...</option>

              <option value="Time">وقت</option>

              <option value="Money">مال</option>

              <option value="Both">الاثنين معاً</option>

            </select>

          </div>

          <div className="field">

            <label>هل ستدفع مقابل حل لهذه المشكلة؟</label>

            <select name="would_pay" value={formData.would_pay} onChange={handleChange} required>

              <option value="">اختر...</option>

              <option value="Yes">نعم</option>

              <option value="Maybe">ربما</option>

              <option value="No">لا</option>

            </select>

          </div>

          <div className="field">

            <label>كم تتوقع أن تدفع شهرياً إذا كان الحل مفيداً؟</label>

            <select name="monthly_budget" value={formData.monthly_budget} onChange={handleChange} required>

              <option value="">اختر...</option>

              <option value="LessThan5">أقل من 5$</option>

              <option value="5To10">من 5$ إلى 10$</option>

              <option value="10To20">من 10$ إلى 20$</option>

              <option value="MoreThan20">أكثر من 20$</option>

              <option value="WouldNotPay">لن أدفع</option>

            </select>

          </div>

          <div className="field">

            <label>ما أفضل طريقة للتواصل معك؟</label>

            <select name="contact_method" value={formData.contact_method} onChange={handleChange} required>

              <option value="">اختر...</option>

              <option value="WhatsApp">WhatsApp</option>

              <option value="PhoneCall">اتصال هاتفي</option>

              <option value="SMS">رسالة SMS</option>

              <option value="NoContact">لا أريد التواصل</option>

            </select>

          </div>

          <div className="field">

            <label>رقم الهاتف اختياري</label>

            <input

              name="phone_number"

              value={formData.phone_number}

              onChange={handleChange}

              placeholder="مثال: 03 123 456"

            />

          </div>

          <button disabled={loading}>

            {loading ? "جاري الإرسال..." : "إرسال الاستبيان"}

          </button>

        </form>

        {status && <p className="status">{status}</p>}

      </section>

    </main>

  );

}

export default App;