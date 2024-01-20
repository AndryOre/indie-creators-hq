import { type ChangeEvent, useEffect, useRef, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage, Input } from "@/components";
import { cn } from "@/lib/utils";

import { UploadSimple } from "@phosphor-icons/react";
import { useTranslation } from "next-i18next";

interface ImagePickerProps {
  className?: string;
  hideInput?: boolean;
  size?: string;
  initialValue?: string;
  onChange?: (newImageSrc: string) => void;
}

export const ImagePicker = ({
  className,
  hideInput = true,
  size = "w-20 h-20",
  initialValue,
  onChange,
}: ImagePickerProps): JSX.Element => {
  const { t } = useTranslation("common");

  const [imageSrc, setImageSrc] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialValue) {
      setImageSrc(initialValue);
    }
  }, [initialValue]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setImageSrc("");
      setError("");
      if (onChange) {
        onChange("");
      }
      return;
    }

    setError("");

    if (file.type.startsWith("image/")) {
      const img = new Image();
      img.onload = () => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            const newImageSrc = e.target.result as string;
            setImageSrc(newImageSrc);
            if (onChange) {
              onChange(newImageSrc);
            }
          }
        };
        reader.readAsDataURL(file);
      };
      img.onerror = () => {
        setError(t("imagePicker.invalidFile"));
        setImageSrc("");
        if (onChange) {
          onChange("");
        }
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    fileInputRef.current?.click();
  };

  const avatarClass = cn(size, className, "border", "rounded-full");
  const inputClass = cn({
    "cursor-pointer": !hideInput,
    hidden: hideInput,
  });

  return (
    <div className="flex gap-4 items-center">
      <Avatar
        className={avatarClass}
        onClick={handleAvatarClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AvatarImage src={imageSrc} />
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer">
            <UploadSimple size={32} />
          </div>
        )}
        <AvatarFallback className="cursor-pointer" onClick={handleAvatarClick}>
          <UploadSimple size={32} />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <Input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          ref={fileInputRef}
          className={inputClass}
        />
        {error && <div className="text-destructive">{error}</div>}
      </div>
    </div>
  );
};
