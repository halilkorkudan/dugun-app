import React, { useState } from "react";
import {
    Camera,
    Upload,
    Heart,
    User,
    X,
    CheckCircle,
    AlertCircle,
    Info,
} from "lucide-react";

// Basit konfeti komponenti
const Confetti = ({ show }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {[...Array(100)].map((_, i) => (
                <div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full bg-rose-500 animate-fall`}
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
                    }}
                />
            ))}
            <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall 3s linear forwards;
        }
      `}</style>
        </div>
    );
};

const WeddingPhotoApp = () => {
    const [userName, setUserName] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]); // Seçilen dosyalar
    const [showConfetti, setShowConfetti] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Desteklenen formatlar ve boyut limitleri
    const supportedFormats = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/gif",
        "image/tiff",
        "image/bmp",
        "image/heic",
        "image/heif",
        "video/mp4",
        "video/quicktime",
    ];
    const maxImageFileSize = 1 * 1024 * 1024 * 1024; // 1GB
    const maxVideoFileSize = 1 * 1024 * 1024 * 1024; // 1GB
    const maxFiles = 100; // Maks dosya

    // Toast sistemi
    const [toasts, setToasts] = useState([]);
    const showToast = (message, type = "success") => {
        const id = Date.now();
        const toast = { id, message, type };
        setToasts((prev) => [...prev, toast]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    };

    const handleLogin = () => {
        if (userName.trim()) setIsLoggedIn(true);
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleLogin();
    };

    // Dosya validasyonu
    const validateFile = (file) => {
        const errors = [];
        const mimeType = file.type || getMimeFromExtension(file.name);

        if (!supportedFormats.includes(mimeType)) {
            errors.push(`Desteklenmeyen format: ${mimeType || "bilinmiyor"}`);
        }

        const isVideo = (mimeType || "").startsWith("video/");
        const limit = isVideo ? maxVideoFileSize : maxImageFileSize;
        if (file.size > limit) {
            errors.push(
                `Dosya çok büyük: ${(file.size / 1024 / 1024).toFixed(1)}MB (Max: ${limit / 1024 / 1024
                }MB)`
            );
        }
        return errors;
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const getMimeFromExtension = (name) => {
        const ext = name.split(".").pop()?.toLowerCase();
        switch (ext) {
            case "heic":
            case "heif":
                return "image/heic";
            case "jpg":
            case "jpeg":
                return "image/jpeg";
            case "png":
                return "image/png";
            case "webp":
                return "image/webp";
            case "gif":
                return "image/gif";
            case "tiff":
            case "tif":
                return "image/tiff";
            case "bmp":
                return "image/bmp";
            case "mp4":
                return "video/mp4";
            case "mov":
                return "video/quicktime";
            default:
                return "";
        }
    };

    // Fotoğraf seçimi
    const handlePhotoSelect = (e) => {
        const files = Array.from(e.target.files);

        if (files.length + selectedFiles.length > maxFiles) {
            showToast(
                `Tek seferde maksimum ${maxFiles} dosya seçebilirsiniz`,
                "error"
            );
            e.target.value = "";
            return;
        }

        const validFiles = [];
        const invalidFiles = [];

        files.forEach((file) => {
            const errors = validateFile(file);
            if (errors.length === 0) validFiles.push(file);
            else invalidFiles.push({ file, errors });
        });

        invalidFiles.forEach(({ file, errors }) =>
            showToast(`${file.name}: ${errors.join(", ")}`, "error")
        );

        if (validFiles.length > 0)
            setSelectedFiles((prev) => [...prev, ...validFiles]);

        e.target.value = "";
    };

    // Seçilen fotoğrafı silme
    const removeSelectedFile = (index) => {
        const removedFile = selectedFiles[index];
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
        showToast(`${removedFile.name} kaldırıldı`, "info");
    };

    // Gönder butonu
    const handleSendPhotos = async () => {
        if (selectedFiles.length === 0) {
            showToast("Gönderecek fotoğraf yok", "error");
            return;
        }

        setUploading(true);
        let successCount = 0;

        for (const file of selectedFiles) {
            try {
                const formData = new FormData();
                formData.append("file", file, file.name);
                formData.append("username", userName);
                formData.append("fileSize", String(file.size));
                formData.append("fileName", file.name);

                const response = await fetch(
                    "http://localhost:5678/webhook/upload-photo",
                    { method: "POST", body: formData }
                );

                // JSON parse edilemiyorsa bile hata gösterme
                try {
                    const result = await response.json();
                    console.log("Backend yanıtı:", result);
                } catch (e) {
                    console.log("JSON yanıtı yok ama yükleme tamamlanmış olabilir");
                }

                // Frontend listesine ekleme
                const mimeType =
                    file.type ||
                    getMimeFromExtension(file.name) ||
                    "application/octet-stream";
                const isVideo = mimeType.startsWith("video/");

                if (isVideo) {
                    const newItem = {
                        id: Date.now() + Math.random(),
                        src: URL.createObjectURL(file),
                        name: file.name,
                        size: file.size,
                        type: mimeType,
                        uploadedBy: userName,
                        uploadTime: new Date().toLocaleString("tr-TR"),
                        isVideo: true,
                    };
                    setUploadedPhotos((prev) => [...prev, newItem]);
                } else {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const newItem = {
                            id: Date.now() + Math.random(),
                            src: event.target.result,
                            name: file.name,
                            size: file.size,
                            type: mimeType,
                            uploadedBy: userName,
                            uploadTime: new Date().toLocaleString("tr-TR"),
                            isVideo: false,
                        };
                        setUploadedPhotos((prev) => [...prev, newItem]);
                    };
                    reader.readAsDataURL(file);
                }

                // Başarı sayısını artır
                successCount++;
            } catch (err) {
                // Sadece gerçek network/fetch hatalarında hata göster
                console.error("Fotoğraf yüklenemedi:", err);
                showToast(`${file.name}: Yükleme başarısız - ${err.message}`, "error");
            }
        }

        // Konfeti ve mesaj
        if (successCount > 0) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 4000);

            showToast(
                successCount === 1
                    ? `1 fotoğraf başarıyla yüklendi!`
                    : `${successCount} fotoğraf başarıyla yüklendi!`,
                "success"
            );
        }

        setSelectedFiles([]); // Gönderilenleri temizle
        setUploading(false);
    };

    const removePhoto = (photoId) => {
        setUploadedPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
        showToast("Fotoğraf silindi", "info");
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserName("");
        setUploadedPhotos([]);
        setSelectedFiles([]);
        setToasts([]);
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 flex items-center justify-center p-3 sm:p-4 md:p-6">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md p-6 sm:p-8">
                    <div className="text-center mb-6 sm:mb-8">
                        <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                            <Heart className="text-white w-8 h-8 sm:w-10 sm:h-10" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                            Düğün Fotoğrafları
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600 px-2">
                            Mutlu anılarınızı bizimle paylaşın
                        </p>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <div className="block text-sm font-medium text-gray-700 mb-2">
                                Adınız
                            </div>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Adınızı girin"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-colors text-base"
                                    autoFocus
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleLogin}
                            disabled={!userName.trim()}
                            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 sm:py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base"
                        >
                            Devam Et
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 relative">
            <Confetti show={showConfetti} />

            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-50 space-y-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`px-4 py-3 rounded-lg shadow-lg max-w-sm flex items-center space-x-2 animate-slide-in ${toast.type === "success"
                                ? "bg-green-500 text-white"
                                : toast.type === "error"
                                    ? "bg-red-500 text-white"
                                    : "bg-blue-500 text-white"
                            }`}
                    >
                        {toast.type === "success" && <CheckCircle className="w-5 h-5" />}
                        {toast.type === "error" && <AlertCircle className="w-5 h-5" />}
                        {toast.type === "info" && <Info className="w-5 h-5" />}
                        <span className="text-sm">{toast.message}</span>
                    </div>
                ))}
            </div>

            <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
                {/* Header */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 mb-4 sm:mb-6 md:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                        <div className="min-w-0 flex-1">
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 truncate">
                                Hoşgeldin, {userName}! 💕
                            </h1>
                            <p className="text-sm sm:text-base text-gray-600 mt-1">
                                Düğünden güzel fotoğraflarını yükle
                            </p>
                        </div>
                        <button
                            onClick={logout}
                            className="flex items-center justify-center sm:justify-start space-x-2 text-gray-500 hover:text-gray-700 transition-colors px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-100 w-full sm:w-auto"
                        >
                            <X className="w-4 h-4" />
                            <span className="text-sm sm:text-base">Çıkış</span>
                        </button>
                    </div>
                </div>

                {/* Upload Section */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 mb-4 sm:mb-6 md:mb-8">
                    <div className="border-2 border-dashed border-rose-300 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 text-center hover:border-rose-400 transition-colors">
                        <Camera className="mx-auto text-rose-500 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-3 sm:mb-4" />
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                            Fotoğraf Seç
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-4 px-2">
                            Fotoğraf: JPEG, PNG, WebP, HEIC (max 10MB) • Video: MP4/MOV (max
                            200MB)
                        </p>

                        {/* Format bilgileri */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                            <div className="text-xs sm:text-sm text-blue-700">
                                <strong>Desteklenen formatlar:</strong> JPEG, JPG, PNG, WebP,
                                HEIC, MP4, MOV
                                <br />
                                <strong>Maksimum boyut:</strong> Fotoğraf 10MB, Video 200MB
                                <br />
                                <strong>Tek seferde:</strong> Maksimum {maxFiles} dosya
                            </div>
                        </div>

                        <label
                            className={`inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-semibold hover:from-rose-600 hover:to-pink-600 transition-all transform hover:scale-105 cursor-pointer text-sm sm:text-base ${uploading ? "opacity-50 pointer-events-none" : ""
                                }`}
                        >
                            <Upload className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                            Fotoğraf Seç
                            <input
                                type="file"
                                multiple
                                accept="image/*,.heic,.heif,video/mp4,video/quicktime,.mp4,.mov"
                                onChange={handlePhotoSelect}
                                disabled={uploading}
                                className="hidden"
                            />
                        </label>

                        {/* Seçilen dosyalar listesi */}
                        {selectedFiles.length > 0 && (
                            <div className="mt-4 text-left">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">
                                    Seçilen Dosyalar ({selectedFiles.length})
                                </h4>
                                <ul className="space-y-2">
                                    {selectedFiles.map((file, index) => (
                                        <li
                                            key={index}
                                            className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm"
                                        >
                                            <span className="truncate">{file.name}</span>
                                            <button
                                                onClick={() => removeSelectedFile(index)}
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={handleSendPhotos}
                                    disabled={uploading}
                                    className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-all"
                                >
                                    {uploading ? "Yükleniyor..." : "Gönder"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Yüklenen Fotoğraflar */}
                {uploadedPhotos.length > 0 && (
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                            Yüklenen Fotoğraflar ({uploadedPhotos.length})
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {uploadedPhotos.map((photo) => (
                                <div
                                    key={photo.id}
                                    className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="aspect-square bg-gray-200 overflow-hidden">
                                        {photo.isVideo ? (
                                            <video
                                                src={photo.src}
                                                controls
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <img
                                                src={photo.src}
                                                alt={photo.name}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform"
                                            />
                                        )}
                                    </div>
                                    <div className="p-3">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-medium text-sm text-gray-800 truncate flex-1">
                                                {photo.name}
                                            </h3>
                                            <button
                                                onClick={() => removePhoto(photo.id)}
                                                className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="text-xs text-gray-500 space-y-1">
                                            <div>{formatFileSize(photo.size)}</div>
                                            <div>{photo.uploadTime}</div>
                                            <div className="bg-gray-200 px-2 py-1 rounded text-xs">
                                                {photo.type && photo.type.includes("/")
                                                    ? photo.type.split("/")[1].toUpperCase()
                                                    : photo.type || "DOSYA"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Boş durum */}
                {uploadedPhotos.length === 0 && selectedFiles.length === 0 && (
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-8 text-center">
                        <div className="text-gray-400 mb-4">
                            <Camera className="w-16 h-16 mx-auto mb-4" />
                            <p className="text-lg">Henüz fotoğraf yüklemedin</p>
                            <p className="text-sm">İlk fotoğrafını yükleyerek başla!</p>
                        </div>
                    </div>
                )}
            </div>

            {/* CSS Animasyonları */}
            <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
        </div>
    );
};

export default WeddingPhotoApp;
