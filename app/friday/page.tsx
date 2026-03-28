import Link from 'next/link'

export default function FridaySMSPage() {
  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col items-center justify-center px-4 py-10">
      <p className="text-xs text-gray-400 mb-4">Friday 7pm — Sarah the coordinator gets this SMS</p>

      {/* SMS frame */}
      <div className="w-full max-w-sm bg-[#f5f4ef] rounded-3xl border border-[#e8e6e0] overflow-hidden shadow-sm">
        <div className="bg-white px-5 py-3.5 border-b border-[#e8e6e0]">
          <div className="text-base font-medium text-gray-900">ConfirmSunday</div>
          <div className="text-xs text-gray-400">Text message · Friday 7:03 PM</div>
        </div>

        <div className="px-4 py-5 flex flex-col gap-3">
          {/* First SMS — not fully confirmed yet */}
          <div className="self-end max-w-[85%] bg-[#1e3a5f] text-white px-4 py-3 rounded-2xl rounded-tr-sm text-sm leading-relaxed">
            ConfirmSunday — Friday Update<br />
            Grace Community Church<br />
            <br />
            ✅ Confirmed: 10/11<br />
            ⏳ Pending: 1 (Sound Tech backup)<br />
            <br />
            Sound Tech backup hasn&apos;t replied yet:<br />
            confirmsunday.com/dashboard
          </div>
          <div className="text-xs text-gray-400 text-right">Delivered · 7:03 PM</div>

          {/* Second SMS — Saturday morning all clear */}
          <div className="mt-2 self-end max-w-[85%] bg-[#16a34a] text-white px-4 py-3 rounded-2xl rounded-tr-sm text-sm leading-relaxed">
            All 11 spots confirmed! 🎉<br />
            <br />
            Enjoy your Friday, Sarah.<br />
            See you Sunday.
          </div>
          <div className="text-xs text-gray-400 text-right">Delivered · Saturday 9:12 AM</div>
        </div>
      </div>

      <div className="mt-6">
        <Link
          href="/sunday"
          className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-2.5 px-6 rounded-lg text-sm transition-colors"
        >
          See Sunday morning →
        </Link>
      </div>
    </div>
  )
}
