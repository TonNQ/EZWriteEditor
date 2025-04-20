import { useEffect, useRef, useState } from "react"
import { Editor } from "@tiptap/react"
import ChevronDown from "../../Icons/ChevronDown"
import ChevronUp from "../../Icons/ChevronUp"
import BaseButton from "../BaseButton"
import SearchReplaceIcon from "./SearchReplaceIcon"
import { cn } from "../../../libs/tailwind/utils"

interface SearchReplaceButtonProps {
  editor: Editor
}

interface SearchMatch {
  index: number
  length: number
}

const SearchReplaceButton = ({ editor }: SearchReplaceButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [replaceText, setReplaceText] = useState("")
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [matchCount, setMatchCount] = useState(0)
  const [currentMatch, setCurrentMatch] = useState(0)
  const popoverRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        clear() 
      }
    };
  
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  
  // Update search and replace terms and reset index if needed
  useEffect(() => {
    if (editor) {
      editor.commands.setSearchTerm(searchText);
      editor.commands.setReplaceTerm(replaceText);
      editor.commands.setCaseSensitive(caseSensitive);

      const { results, resultIndex } = editor.storage.searchAndReplace;
      setMatchCount(results.length);
      setCurrentMatch(results.length === 0 ? 0 : resultIndex + 1);
    }
  }, [searchText, replaceText, caseSensitive, editor]);

  const navigateUp = () => {
    if (editor) {
      console.log('navigateUp')
      editor.commands.previousSearchResult();
      goToSelection();
    }
  };

  const navigateDown = () => {
    if (editor) {
      console.log('navigateDown')
      editor.commands.nextSearchResult();
      goToSelection();
    }
  };

  const goToSelection = () => {
    if (!editor) return;

    const { results, resultIndex } = editor.storage.searchAndReplace;
    const position = results[resultIndex];

    if (!position) return;

    editor.commands.setTextSelection(position);
    const { node } = editor.view.domAtPos(editor.state.selection.anchor);
    node instanceof HTMLElement &&
      node.scrollIntoView({ behavior: "smooth", block: "center" });

    setMatchCount(results.length);
    setCurrentMatch(results.length === 0 ? 0 : resultIndex + 1);
  };

  const handleReplace = () => {
    if (editor) {
      editor.commands.replace();
      goToSelection();
    }
  };

  const handleReplaceAll = () => {
    if (editor) {
      editor.commands.replaceAll();
    }
  };

  const clear = () => {
    setSearchText("");
    setReplaceText("");
    if (editor) {
      editor.commands.resetIndex();
    }
  };

  const togglePopover = () => {
    setIsOpen((prev) => !prev);
  };


  return (
    <div className="relative">
      <BaseButton onClick={togglePopover}>
        <SearchReplaceIcon />
      </BaseButton>

      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute top-full left-0 z-10 mt-1 w-80 rounded border border-gray-200 bg-white p-4 shadow-lg"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="search" className="text-sm font-medium">
                  Search
                </label>
                <span className="text-sm text-gray-500">
                  {currentMatch}/{matchCount}
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  id="search"
                  ref={searchInputRef}
                  type="text"
                  placeholder="Text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="flex-1 rounded border border-gray-300 px-3 py-1.5 text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none"
                />
                <div className="flex">
                  <button
                    type="button"
                    onClick={navigateUp}
                    disabled={currentMatch <= 1 || matchCount === 0}
                    className={cn('rounded-l bg-gray-200 px-2 py-1.5', {
                      'cursor-not-allowed opacity-50': currentMatch <= 1 || matchCount === 0,
                      'hover:bg-gray-300': currentMatch > 1 && matchCount > 0
                    }) }
                  >
                    <span className="sr-only">Previous match</span>
                    <ChevronUp width={20} height={20} />
                  </button>
                  <button
                    type="button"
                    onClick={navigateDown}
                    disabled={currentMatch >= matchCount || matchCount === 0}
                    className={cn('rounded-r bg-gray-200 px-2 py-1.5', {
                      'cursor-not-allowed opacity-50': currentMatch >= matchCount || matchCount === 0,
                      'hover:bg-gray-300': currentMatch < matchCount && matchCount > 0
                    })}
                  >
                    <span className="sr-only">Next match</span>
                    <ChevronDown width={20} height={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="replace" className="block w-full text-left text-sm font-medium">
                Replace
              </label>
              <input
                id="replace"
                type="text"
                placeholder="Text"
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={caseSensitive}
                  onChange={(e) => setCaseSensitive(e.target.checked)}
                  className="sr-only peer"
                />
                <div className='relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gray-500'></div>
                <span className="ms-2 text-sm font-medium">Case Sensitive</span>
              </label>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className={cn('flex-1 rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300', {
                  'cursor-not-allowed opacity-50':  !searchText || matchCount === 0
                })}
                onClick={handleReplace}
                disabled={!searchText || matchCount === 0}
              >
                Replace
              </button>
              <button
                type="button"
                className={cn('flex-1 rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300', {
                  'cursor-not-allowed opacity-50':  !searchText || matchCount === 0
                })}
                onClick={handleReplaceAll}
                disabled={!searchText || matchCount === 0}
              >
                Replace All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchReplaceButton