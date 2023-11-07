import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useTranslation } from "next-i18next";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQs = Record<string, FAQItem>;

export const Faqs = (): JSX.Element => {
  const { t } = useTranslation("common");
  const faqs: FAQs = t("faqs.questions", { returnObjects: true }) || {};

  return (
    <>
      <Accordion type="single" collapsible>
        {Object.keys(faqs).map((key) => (
          <AccordionItem key={key} value={`item-${key}`}>
            <AccordionTrigger className="text-start">
              {faqs[key]?.question}
            </AccordionTrigger>
            <AccordionContent>{faqs[key]?.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};
