interface ImageUploaderProps {
  callback: (url: string) => void;
}

export function ImageUploader({ callback }: ImageUploaderProps) {
  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const image = event.target.files?.[0];
    if (!image) return;
    const reader = new FileReader();

    reader.readAsDataURL(image);

    reader.addEventListener(
      "load",
      () => {
        const url = reader.result as string;
        callback(url);
      },
      { once: true }
    );
  }

  return (
    <input
      type="file"
      className="file-input file-input-bordered file-input-md w-full max-w-xs"
      onChange={handleOnChange}
    />
  );
}
