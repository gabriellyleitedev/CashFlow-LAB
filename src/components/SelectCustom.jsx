import { Listbox } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

export default function SelectCustom({ value, onChange, options, placeholder }) {
    return (
        <Listbox value={value} onChange={onChange}>
            <div className="relative w-full">
                <Listbox.Button className="w-full bg-[#121212] border border-zinc-800 rounded-xl h-12 pl-4 pr-10 text-sm text-zinc-400 flex items-center justify-between focus:border-violet-500/50 outline-none transition-all">
                    <span className="truncate">{value || placeholder}</span>
                    <ChevronDown size={18} className="text-zinc-600" />
                </Listbox.Button>

                <Listbox.Options className="absolute mt-2 w-full bg-[#18181b] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-100">
                    {options.map((op) => (
                        <Listbox.Option
                            key={op}
                            value={op}
                            className={({ active }) =>
                                `cursor-pointer px-4 py-3 text-sm flex items-center justify-between transition-colors
                                ${active ? "bg-violet-600/20 text-violet-400" : "text-zinc-400"}`
                            }
                        >
                            {({ selected }) => (
                                <>
                                    <span>{op}</span>
                                    {selected && <Check size={16} className="text-violet-500" />}
                                </>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    );
}