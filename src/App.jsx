import { useState } from "react";
import { supabase } from "./lib/supabase";
import "./App.css";

const emptyForm = {
  business_type: "Rider",
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
        <span className="badge">استبيان للسائقين</span>

        <h1>MotoHub Lebanon</h1>

        <p>
          نُجري دراسة لفهم مشاكل سائقي الدراجات النارية في لبنان عند الصيانة،
          الأعطال، التواصل مع الورش، وقطع الغيار.
        </p>
      </section>

      <section className="card">
        <h2>ساعدنا نفهم مشاكل السائقين</h2>

        <form onSubmit={submitSurvey} className="form">
          <div className="field">
            <label>ما هو استخدامك الأساسي للدراجة؟</label>
            <select
              name="management_method"
              value={formData.management_method}
              onChange={handleChange}
              required
            >
              <option value="">اختر...</option>
              <option value="DeliveryWork">عمل / دليفري</option>
              <option value="DailyTransport">تنقل يومي</option>
              <option value="PersonalUse">استخدام شخصي</option>
              <option value="Student">طالب</option>
              <option value="Other">غير ذلك</option>
            </select>
          </div>

          <div className="field">
            <label>كم مرة تحتاج دراجتك إلى صيانة؟</label>
            <select
              name="time_waster"
              value={formData.time_waster}
              onChange={handleChange}
              required
            >
              <option value="">اختر...</option>
              <option value="Monthly">كل شهر</option>
              <option value="Every2To3Months">كل شهرين أو ثلاثة</option>
              <option value="Every6Months">كل 6 أشهر</option>
              <option value="WhenBroken">فقط عند حدوث عطل</option>
            </select>
          </div>

          <div className="field">
            <label>كيف تختار الميكانيكي أو الورشة؟</label>
            <select
              name="mistake_source"
              value={formData.mistake_source}
              onChange={handleChange}
              required
            >
              <option value="">اختر...</option>
              <option value="SameMechanic">نفس الميكانيكي دائماً</option>
              <option value="FriendRecommendation">توصية من صديق</option>
              <option value="WhatsAppGroups">مجموعات واتساب</option>
              <option value="Facebook">فيسبوك</option>
              <option value="NearbyGarage">أقرب ورشة</option>
              <option value="SearchManually">أبحث بنفسي</option>
            </select>
          </div>

          <div className="field">
            <label>ما أكبر مشكلة تواجهك عند تصليح الدراجة؟</label>
            <select
              name="biggest_problem"
              value={formData.biggest_problem}
              onChange={handleChange}
              required
            >
              <option value="">اختر...</option>
              <option value="HighPrices">الأسعار مرتفعة</option>
              <option value="NoRepairUpdates">لا أعرف حالة التصليح</option>
              <option value="Delays">التأخير في التصليح</option>
              <option value="NoTrust">عدم الثقة بالورشة</option>
              <option value="PartsAvailability">عدم توفر قطع الغيار</option>
              <option value="PoorCommunication">ضعف التواصل</option>
            </select>
          </div>

          <div className="field">
            <label>هل تعطلت دراجتك في الطريق من قبل؟</label>
            <select
              name="saves"
              value={formData.saves}
              onChange={handleChange}
              required
            >
              <option value="">اختر...</option>
              <option value="Yes">نعم</option>
              <option value="No">لا</option>
            </select>
          </div>

          <div className="field">
            <label>إذا تعطلت الدراجة في الطريق، ماذا تفعل عادة؟</label>
            <select
              name="desired_feature"
              value={formData.desired_feature}
              onChange={handleChange}
              required
            >
              <option value="">اختر...</option>
              <option value="CallMechanic">أتصل بالميكانيكي</option>
              <option value="CallFriend">أتصل بصديق</option>
              <option value="SearchNearbyGarage">أبحث عن ورشة قريبة</option>
              <option value="TowService">أطلب سحب / نقل</option>
              <option value="FixMyself">أحاول إصلاحها بنفسي</option>
            </select>
          </div>

          <div className="field">
            <label>ما الميزة التي ستفيدك أكثر؟</label>
            <select
              name="would_pay"
              value={formData.would_pay}
              onChange={handleChange}
              required
            >
              <option value="">اختر...</option>
              <option value="RepairTracking">متابعة حالة التصليح</option>
              <option value="NearbyMechanics">إيجاد ورش قريبة</option>
              <option value="EmergencyHelp">طلب مساعدة عند العطل</option>
              <option value="ServiceHistory">سجل صيانة الدراجة</option>
              <option value="MaintenanceReminders">تذكيرات الصيانة</option>
              <option value="SpareParts">شراء قطع غيار</option>
            </select>
          </div>

          <div className="field">
            <label>هل ستستخدم تطبيقاً يساعدك في الصيانة والأعطال؟</label>
            <select
              name="monthly_budget"
              value={formData.monthly_budget}
              onChange={handleChange}
              required
            >
              <option value="">اختر...</option>
              <option value="Yes">نعم</option>
              <option value="Maybe">ربما</option>
              <option value="No">لا</option>
            </select>
          </div>

          <div className="field">
            <label>ما أفضل طريقة للتواصل معك؟</label>
            <select
              name="contact_method"
              value={formData.contact_method}
              onChange={handleChange}
              required
            >
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