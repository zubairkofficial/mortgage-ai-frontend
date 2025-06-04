    import { FC } from "react";
    import { useNavigate } from "react-router-dom";
    import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
    import { LucideIcon } from "lucide-react";

    interface SupportCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    listItems: string[];
    buttonText: string;
    route: string;
    }

    const SupportCard: FC<SupportCardProps> = ({
    title,
    description,
    icon: Icon,
    listItems,
    buttonText,
    route,
    }) => {
    const navigate = useNavigate();

    return (
        <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex items-center mb-4">
            <Icon size={48} className="text-primary mr-4" />
            <div>
                <p className="mb-2">{description}</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {listItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
                </ul>
            </div>
            </div>
            <button
            className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            onClick={() => navigate(route)}
            >
            {buttonText}
            </button>
        </CardContent>
        </Card>
    );
    };

    interface SupportCardsProps {
    cards: SupportCardProps[];
    className?: string;
    }

    const SupportCards: FC<SupportCardsProps> = ({
    cards
    }) => {
    return (
        <>
        {cards.map((card, index) => (
            <SupportCard key={`${card.title}-${index}`} {...card} />
        ))}
        </>
    );
    };

    export default SupportCards;