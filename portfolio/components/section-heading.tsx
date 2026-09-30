import { Item, Stagger } from "@/components/reveal";

export function SectionHeading({
  index,
  label,
  title,
  description,
  action,
}: {
  index: string;
  label: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <Stagger className="mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-xl">
        <Item className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          <span className="text-fg">{index}</span>
          <span className="mx-2 text-faint">/</span>
          {label}
        </Item>
        <Item>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[2.5rem]">
            {title}
          </h2>
        </Item>
        {description ? (
          <Item>
            <p className="mt-4 text-pretty text-[15px] leading-[1.65] text-fg-2">{description}</p>
          </Item>
        ) : null}
      </div>
      {action ? <Item className="shrink-0">{action}</Item> : null}
    </Stagger>
  );
}
