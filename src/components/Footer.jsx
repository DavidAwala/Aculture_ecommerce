export default function Footer() {
  return (
    <footer className="border-t border-black/10 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full premium-border overflow-hidden">
            <img src="/logo.png" alt="AC Logo" className="w-full h-full object-cover"/>
          </div>
          <div>
            <div className="text-sm font-semibold">A CULTURE</div>
            <div className="text-xs">It's all about men.</div>
          </div>
        </div>
        <div className="text-sm mt-4 md:mt-0">&copy; {new Date().getFullYear()} A Culture. All rights reserved.</div>
      </div>
    </footer>
  )
}

