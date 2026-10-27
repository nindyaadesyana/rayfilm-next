import { Expand, Minimize2, Play, Plus, ThumbsUp, X } from "lucide-react";

interface VideoControlsProps {
  expanded: boolean;
  onToggleExpand: () => void;
  onClose: () => void;
  onPlay?: () => void;
}

export function VideoControls({ expanded, onToggleExpand, onClose, onPlay }: VideoControlsProps) {
  return (
    <div className="flex items-center justify-between gap-4 pb-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Play video"
          onClick={onPlay}
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-[#e5e5e5] bg-[#111111] text-white shadow-sm transition-all duration-200 hover:scale-105 hover:border-[#111111]"
        >
          <Play size={17} className="ml-0.5 fill-white" />
        </button>

        <button
          type="button"
          aria-label="Add to favorites"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-[#111111] transition-all duration-200 hover:scale-105 hover:border-[#d5d5d5] hover:bg-[#f7f7f7]"
        >
          <Plus size={18} />
        </button>

        <button
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-[#111111] transition-all duration-200 hover:scale-105 hover:border-[#d5d5d5] hover:bg-[#f7f7f7]"
        >
          <X size={16} />
        </button>

        <button
          type="button"
          aria-label="Like video"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-[#111111] transition-all duration-200 hover:scale-105 hover:border-[#d5d5d5] hover:bg-[#f7f7f7]"
        >
          <ThumbsUp size={16} />
        </button>
      </div>

      <button
        type="button"
        aria-label={expanded ? "Collapse video" : "Expand video"}
        onClick={onToggleExpand}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-[#111111] transition-all duration-200 hover:scale-105 hover:border-[#d5d5d5] hover:bg-[#f7f7f7]"
      >
        {expanded ? <Minimize2 size={16} /> : <Expand size={16} />}
      </button>
    </div>
  );
}
