interface AboutModalProps {
  onClose: () => void;
}

export function AboutModal({ onClose }: AboutModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">About Mojibun</h3>
            <p className="text-sm text-gray-400">Simple, free Japanese learning</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-gray-600">
          <p>
            Many language apps are expensive now. With modern LLMs, making a learning app is
            not hard anymore.
          </p>
          <p>
            Learning should be free. That is why this app exists.
          </p>
          <p>
            This is version 0.1. The course still needs a lot of work, and all feedback is
            appreciated.
          </p>
          <div className="bg-surface rounded-2xl p-4 space-y-2">
            <p>
              Open source:{' '}
              <a
                href="https://github.com/jonirajala/mojibun"
                target="_blank"
                rel="noreferrer"
                className="text-primary font-semibold underline underline-offset-2"
              >
                github.com/jonirajala/mojibun
              </a>
            </p>
            <p>
              Questions:{' '}
              <a
                href="mailto:joni.m.rajala@gmail.com"
                className="text-primary font-semibold underline underline-offset-2"
              >
                joni.m.rajala@gmail.com
              </a>
            </p>
            <p className="text-xs text-gray-500 pt-1">
              Visual icons powered by OpenMoji, licensed under CC BY-SA 4.0.
            </p>
          </div>
        </div>

        <button onClick={onClose} className="w-full btn-primary mt-6">
          Close
        </button>
      </div>
    </div>
  );
}
