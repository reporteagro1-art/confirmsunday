'use client'

interface Props { onNext: () => void }

export default function StepWelcome({ onNext }: Props) {
  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-[#1e3a5f] mb-2">
        Welcome to ConfirmSunday!
      </h1>
      <p className="text-gray-500 text-sm mb-8 font-light">
        Let&apos;s get you set up in about 10 minutes. Here&apos;s what we&apos;ll do:
      </p>

      <div className="flex flex-col gap-3 mb-10">
        {[
          {
            n: '1',
            title: 'Add your volunteers',
            desc: 'Paste a list of names and emails — takes about 2 minutes.',
          },
          {
            n: '2',
            title: 'Define your roles',
            desc: 'Sound Tech, Greeters, Kids Ministry — whatever your church needs.',
          },
          {
            n: '3',
            title: 'Assign volunteers to each role',
            desc: 'Set who serves each week and who backs them up if they can\'t make it.',
          },
          {
            n: '4',
            title: 'Set your schedule',
            desc: 'Tell us when to send emails. Then forget about it forever.',
          },
        ].map(item => (
          <div key={item.n} className="bg-white border border-[#e8e6e0] rounded-xl p-4 flex gap-4 items-start">
            <div className="w-8 h-8 bg-[#eff6ff] border border-[#bfdbfe] rounded-full flex items-center justify-center text-[#2563eb] text-sm font-medium flex-shrink-0">
              {item.n}
            </div>
            <div>
              <div className="font-medium text-sm mb-0.5">{item.title}</div>
              <div className="text-gray-500 text-xs font-light">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-3 px-8 rounded-lg text-sm transition-colors"
        >
          Let&apos;s go →
        </button>
      </div>
    </div>
  )
}
