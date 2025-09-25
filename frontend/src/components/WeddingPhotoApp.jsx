import React, { useState, useEffect } from "react";
import {
    Camera,
    Upload,
    Heart,
    User,
    X,
    CheckCircle,
    AlertCircle,
    Info,
    Sparkles,
    Crown,
    Star,
    Music,
    Gift,
    Diamond,
} from "lucide-react";

// Gelişmiş konfeti komponenti
const Confetti = ({ show }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {[...Array(150)].map((_, i) => (
                <div
                    key={i}
                    className={`absolute animate-fall`}
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${3 + Math.random() * 2}s`,
                    }}
                >
                    {i % 4 === 0 ? (
                        <Heart className="w-3 h-3 text-rose-400" />
                    ) : i % 4 === 1 ? (
                        <Star className="w-2 h-2 text-yellow-400" />
                    ) : i % 4 === 2 ? (
                        <Sparkles className="w-2 h-2 text-pink-400" />
                    ) : (
                        <div
                            className="w-2 h-2 rounded-full opacity-80"
                            style={{
                                backgroundColor: `hsl(${Math.random() * 60 + 320}, 70%, 60%)`,
                            }}
                        />
                    )}
                </div>
            ))}
            <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear forwards;
        }
      `}</style>
        </div>
    );
};

// Hareket eden arka plan kalpleri
const FloatingHearts = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Büyük hareket eden kalpler */}
            {[...Array(15)].map((_, i) => (
                <div
                    key={`large-${i}`}
                    className="absolute animate-float-move opacity-20"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.8}s`,
                        animationDuration: `${12 + (i % 6)}s`,
                    }}
                >
                    <Heart className="w-6 h-6 text-rose-400" />
                </div>
            ))}

            {/* Orta boyut hareket eden kalpler */}
            {[...Array(20)].map((_, i) => (
                <div
                    key={`medium-${i}`}
                    className="absolute animate-drift opacity-15"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${15 + (i % 8)}s`,
                    }}
                >
                    <Heart className="w-4 h-4 text-pink-400" />
                </div>
            ))}

            {/* Küçük hareket eden kalpler */}
            {[...Array(25)].map((_, i) => (
                <div
                    key={`small-${i}`}
                    className="absolute animate-gentle-float opacity-10"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.3}s`,
                        animationDuration: `${10 + (i % 5)}s`,
                    }}
                >
                    <Heart className="w-3 h-3 text-purple-400" />
                </div>
            ))}

            {/* Çok küçük parıldayan kalpler */}
            {[...Array(30)].map((_, i) => (
                <div
                    key={`tiny-${i}`}
                    className="absolute animate-sparkle opacity-8"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: `${8 + (i % 4)}s`,
                    }}
                >
                    <Heart className="w-2 h-2 text-rose-300" />
                </div>
            ))}

            <style jsx>{`
        @keyframes float-move {
          0% {
            transform: translateX(0px) translateY(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateX(50px) translateY(-30px) rotate(90deg)
              scale(1.2);
          }
          50% {
            transform: translateX(-30px) translateY(-60px) rotate(180deg)
              scale(0.8);
          }
          75% {
            transform: translateX(-60px) translateY(-30px) rotate(270deg)
              scale(1.1);
          }
          100% {
            transform: translateX(0px) translateY(0px) rotate(360deg) scale(1);
          }
        }

        @keyframes drift {
          0% {
            transform: translateX(0px) translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateX(-40px) translateY(40px) rotate(120deg);
          }
          66% {
            transform: translateX(40px) translateY(-20px) rotate(240deg);
          }
          100% {
            transform: translateX(0px) translateY(0px) rotate(360deg);
          }
        }

        @keyframes gentle-float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) translateX(15px) rotate(90deg);
          }
          50% {
            transform: translateY(-30px) translateX(0px) rotate(180deg);
          }
          75% {
            transform: translateY(-15px) translateX(-15px) rotate(270deg);
          }
        }

        @keyframes sparkle {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.05;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.2;
          }
        }

        .animate-float-move {
          animation: float-move ease-in-out infinite;
        }

        .animate-drift {
          animation: drift ease-in-out infinite;
        }

        .animate-gentle-float {
          animation: gentle-float ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

const WeddingPhotoApp = () => {
    const [userName, setUserName] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

    // Mouse takip efekti
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            setMousePos({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

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
    const maxFiles = 50;

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

                try {
                    const result = await response.json();
                    console.log("Backend yanıtı:", result);
                } catch (e) {
                    console.log("JSON yanıtı yok ama yükleme tamamlanmış olabilir");
                }

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

                successCount++;
            } catch (err) {
                console.error("Fotoğraf yüklenemedi:", err);
                showToast(`${file.name}: Yükleme başarısız - ${err.message}`, "error");
            }
        }

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

        setSelectedFiles([]);
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
            <div className="min-h-screen bg-gradient-to-br from-rose-200 via-pink-200 via-purple-200 to-rose-300 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Animasyonlu gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-300/60 via-rose-400/40 via-purple-300/50 to-pink-200/70 animate-gradient-shift"></div>
                <div className="absolute inset-0 bg-gradient-to-bl from-rose-400/30 via-pink-300/50 via-purple-400/40 to-rose-300/60 animate-gradient-shift-reverse"></div>
                <FloatingHearts />

                {/* Mouse takipli arka plan efekti */}
                <div
                    className="absolute inset-0 transition-all duration-200 ease-out"
                    style={{
                        background: `radial-gradient(circle 400px at ${mousePos.x}% ${mousePos.y}%, 
              rgba(244, 114, 182, 0.9) 0%, 
              rgba(251, 113, 133, 0.7) 30%, 
              rgba(196, 181, 253, 0.5) 60%, 
              rgba(244, 114, 182, 0.3) 100%)`,
                    }}
                ></div>
                <div
                    className="absolute inset-0 transition-all duration-400 ease-out"
                    style={{
                        background: `radial-gradient(circle 500px at ${100 - mousePos.x}% ${100 - mousePos.y
                            }%, 
              rgba(251, 113, 133, 0.8) 0%, 
              rgba(244, 114, 182, 0.6) 25%, 
              rgba(196, 181, 253, 0.4) 50%, 
              rgba(251, 113, 133, 0.2) 100%)`,
                    }}
                ></div>
                <div
                    className="absolute inset-0 transition-all duration-600 ease-out"
                    style={{
                        background: `radial-gradient(ellipse 600px 400px at ${mousePos.x}% ${mousePos.y}%, 
              rgba(196, 181, 253, 0.7) 0%, 
              rgba(251, 207, 232, 0.5) 35%, 
              rgba(244, 114, 182, 0.3) 70%, 
              transparent 100%)`,
                    }}
                ></div>

                {/* Decorative elements */}
                <div className="absolute top-10 left-10 opacity-20">
                    <Crown className="w-16 h-16 text-yellow-400 animate-pulse" />
                </div>
                <div className="absolute bottom-10 right-10 opacity-20">
                    <Diamond className="w-12 h-12 text-blue-300 animate-bounce" />
                </div>
                <div className="absolute top-1/4 right-1/4 opacity-15">
                    <Music
                        className="w-8 h-8 text-purple-400 animate-spin"
                        style={{ animationDuration: "8s" }}
                    />
                </div>

                <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10 border border-white/40">
                    {/* Decorative border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-300/30 via-pink-300/30 to-purple-300/30 rounded-3xl blur-sm opacity-70 -z-10"></div>

                    <div className="text-center mb-8">
                        <div className="relative inline-block mb-6">
                            <div className="bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto shadow-lg">
                                <Heart className="text-white w-12 h-12 animate-pulse" />
                            </div>
                            <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
                                <Sparkles className="w-4 h-4 text-yellow-600" />
                            </div>
                        </div>

                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-3 leading-tight">
                            Aysu Yaren & Alperen
                            Düğün Anıları
                        </h1>
                        <p className="text-gray-600 font-medium">
                            Mutlu anılarınızı bizimle paylaşın ✨
                        </p>
                        <div className="flex justify-center items-center space-x-2 mt-2">
                            <Gift className="w-4 h-4 text-rose-400" />
                            <span className="text-sm text-gray-500">
                                Sevgiyle dolu bir koleksiyon
                            </span>
                            <Gift className="w-4 h-4 text-rose-400" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">
                                Adınız
                            </label>
                            <div className="relative group">
                                <User className="absolute left-4 top-4 text-gray-400 w-5 h-5 group-focus-within:text-rose-500 transition-colors" />
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Adınızı girin"
                                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-rose-200 focus:border-rose-400 outline-none transition-all text-base bg-white/50 backdrop-blur-sm"
                                    autoFocus
                                />
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-400/5 to-pink-400/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
                            </div>
                        </div>

                        <button
                            onClick={handleLogin}
                            disabled={!userName.trim()}
                            className="w-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white py-4 rounded-2xl font-bold text-lg hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 transition-all transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span className="relative flex items-center justify-center space-x-2">
                                <Heart className="w-5 h-5" />
                                <span>Devam Et</span>
                                <Sparkles className="w-5 h-5" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-200 via-pink-300 via-purple-200 to-rose-300 relative overflow-hidden">
            {/* Animasyonlu gradient overlay with mouse interaction */}
            <div
                className="absolute inset-0 bg-gradient-to-tr from-pink-400/50 via-rose-300/60 via-purple-400/40 to-pink-300/70 transition-all duration-300 ease-out"
                style={{
                    background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, 
            rgba(244, 114, 182, 0.6) 0%, 
            rgba(251, 113, 133, 0.5) 25%, 
            rgba(196, 181, 253, 0.4) 50%, 
            rgba(244, 114, 182, 0.7) 100%)`,
                }}
            ></div>
            <div
                className="absolute inset-0 bg-gradient-to-bl from-rose-300/40 via-pink-400/50 via-purple-300/60 to-rose-400/50 transition-all duration-500 ease-out"
                style={{
                    background: `radial-gradient(circle at ${100 - mousePos.x}% ${100 - mousePos.y
                        }%, 
            rgba(251, 113, 133, 0.4) 0%, 
            rgba(244, 114, 182, 0.5) 30%, 
            rgba(196, 181, 253, 0.6) 60%, 
            rgba(251, 113, 133, 0.5) 100%)`,
                }}
            ></div>
            <div
                className="absolute inset-0 bg-gradient-to-tl from-pink-200/60 via-rose-400/30 via-purple-200/70 to-pink-400/40 transition-all duration-700 ease-out"
                style={{
                    background: `radial-gradient(ellipse at ${mousePos.x}% ${mousePos.y}%, 
            rgba(251, 207, 232, 0.6) 0%, 
            rgba(251, 113, 133, 0.3) 40%, 
            rgba(196, 181, 253, 0.7) 70%, 
            rgba(244, 114, 182, 0.4) 100%)`,
                }}
            ></div>
            <FloatingHearts />
            <Confetti show={showConfetti} />

            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-50 space-y-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`px-6 py-4 rounded-2xl shadow-2xl max-w-sm flex items-center space-x-3 animate-slide-in backdrop-blur-md border ${toast.type === "success"
                            ? "bg-emerald-500/90 text-white border-emerald-300"
                            : toast.type === "error"
                                ? "bg-red-500/90 text-white border-red-300"
                                : "bg-blue-500/90 text-white border-blue-300"
                            }`}
                    >
                        {toast.type === "success" && <CheckCircle className="w-6 h-6" />}
                        {toast.type === "error" && <AlertCircle className="w-6 h-6" />}
                        {toast.type === "info" && <Info className="w-6 h-6" />}
                        <span className="font-medium">{toast.message}</span>
                    </div>
                ))}
            </div>

            <div className="w-full max-w-7xl mx-auto px-4 py-6 relative z-10">
                {/* Header */}
                <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl p-6 mb-8 border border-white/40">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                                <Crown className="w-8 h-8 text-yellow-500" />
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                                    Hoşgeldin, {userName}!
                                </h1>
                                <Heart className="w-6 h-6 text-rose-500 animate-pulse" />
                            </div>
                            <p className="text-gray-600 font-medium flex items-center space-x-2">
                                <Sparkles className="w-4 h-4 text-purple-400" />
                                <span>Düğünden güzel fotoğraflarını yükle</span>
                            </p>
                        </div>
                        <button
                            onClick={logout}
                            className="flex items-center justify-center space-x-2 text-gray-500 hover:text-rose-600 transition-all px-6 py-3 rounded-2xl hover:bg-rose-50 backdrop-blur-sm border border-gray-200 hover:border-rose-200 group"
                        >
                            <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                            <span className="font-medium">Çıkış</span>
                        </button>
                    </div>
                </div>

                {/* Upload Section */}
                <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-white/40">
                    <div className="border-2 border-dashed border-rose-300 rounded-3xl p-8 text-center hover:border-rose-400 hover:bg-rose-50/30 transition-all relative group overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-4 left-4 opacity-20 group-hover:opacity-40 transition-opacity">
                            <Star className="w-6 h-6 text-yellow-400" />
                        </div>
                        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                            <Sparkles className="w-6 h-6 text-purple-400" />
                        </div>

                        <div className="relative z-10">
                            <div className="mb-6 relative">
                                <div className="bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 rounded-3xl w-20 h-20 flex items-center justify-center mx-auto shadow-lg mb-4">
                                    <Camera className="text-white w-10 h-10" />
                                </div>
                                <div
                                    className="absolute -top-2 -right-6 bg-yellow-400 rounded-full p-2 animate-bounce"
                                    style={{ animationDelay: "0.5s" }}
                                >
                                    <Gift className="w-4 h-4 text-yellow-600" />
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                Fotoğraf & Video Yükle
                            </h3>
                            <p className="text-gray-600 mb-6 max-w-lg mx-auto leading-relaxed">
                                Düğününüzden en güzel anları bizimle paylaşın. Fotoğraf ve
                                videolarınız güvenle saklanacak.
                            </p>

                            {/* Format bilgileri */}
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200/50 rounded-2xl p-6 mb-6 backdrop-blur-sm">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div className="text-center">
                                        <Camera className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                                        <div className="font-semibold text-blue-800">
                                            Fotoğraflar
                                        </div>
                                        <div className="text-blue-600">JPEG, PNG, WebP, HEIC</div>
                                        <div className="text-xs text-blue-500">Max 1GB</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-6 h-6 mx-auto mb-2 bg-purple-600 rounded flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">▶</span>
                                        </div>
                                        <div className="font-semibold text-purple-800">
                                            Videolar
                                        </div>
                                        <div className="text-purple-600">MP4, MOV</div>
                                        <div className="text-xs text-purple-500">Max 1GB</div>
                                    </div>
                                    <div className="text-center">
                                        <Upload className="w-6 h-6 mx-auto mb-2 text-green-600" />
                                        <div className="font-semibold text-green-800">Limit</div>
                                        <div className="text-green-600">
                                            Tek seferde {maxFiles} dosya
                                        </div>
                                        <div className="text-xs text-green-500">
                                            Sınırsız toplam
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <label
                                className={`inline-flex items-center px-8 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white rounded-2xl font-bold text-lg hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 transition-all transform hover:scale-105 hover:shadow-2xl cursor-pointer relative overflow-hidden group ${uploading ? "opacity-50 pointer-events-none" : ""
                                    }`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <Upload className="w-6 h-6 mr-3" />
                                <span className="relative">Fotoğraf & Video Seç</span>
                                <Sparkles className="w-6 h-6 ml-3" />
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,.heic,.heif,video/mp4,video/quicktime,.mp4,.mov"
                                    onChange={handlePhotoSelect}
                                    disabled={uploading}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* Seçilen dosyalar listesi */}
                        {selectedFiles.length > 0 && (
                            <div className="mt-8 text-left bg-white/50 rounded-2xl p-6 backdrop-blur-sm">
                                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span>Seçilen Dosyalar ({selectedFiles.length})</span>
                                </h4>
                                <div className="space-y-3 max-h-60 overflow-y-auto">
                                    {selectedFiles.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center bg-white/70 border border-gray-200 rounded-xl px-4 py-3 hover:bg-white/90 transition-all"
                                        >
                                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                                                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-2">
                                                    <Camera className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="font-medium text-gray-800 truncate">
                                                        {/* {file.name} */}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {formatFileSize(file.size)}
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeSelectedFile(index)}
                                                className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-2 transition-all"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={handleSendPhotos}
                                    disabled={uploading}
                                    className="mt-6 w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 hover:shadow-xl disabled:opacity-50 relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <span className="relative flex items-center justify-center space-x-2">
                                        {uploading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Yükleniyor...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Heart className="w-5 h-5" />
                                                <span>Yükle & Paylaş</span>
                                                <Star className="w-5 h-5" />
                                            </>
                                        )}
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Yüklenen Fotoğraflar */}
                {uploadedPhotos.length > 0 && (
                    <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/40">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl p-2">
                                <Heart className="w-6 h-6 text-white" />
                            </div>
                            <span>Anı Koleksiyonu ({uploadedPhotos.length})</span>
                            <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {uploadedPhotos.map((photo) => (
                                <div
                                    key={photo.id}
                                    className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-white/50 group"
                                >
                                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative">
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
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <button
                                            onClick={() => removePhoto(photo.id)}
                                            className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110 shadow-lg"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="p-4">
                                        <div className="mb-3">
                                            <h3 className="font-bold text-gray-800 truncate text-sm mb-1">
                                                {photo.name}
                                            </h3>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500">
                                                    {formatFileSize(photo.size)}
                                                </span>
                                                <div
                                                    className={`px-2 py-1 rounded-lg text-xs font-medium ${photo.isVideo
                                                        ? "bg-purple-100 text-purple-700"
                                                        : "bg-blue-100 text-blue-700"
                                                        }`}
                                                >
                                                    {photo.type && photo.type.includes("/")
                                                        ? photo.type.split("/")[1].toUpperCase()
                                                        : photo.type || "DOSYA"}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <div className="flex items-center space-x-1">
                                                <User className="w-3 h-3" />
                                                <span>{photo.uploadedBy}</span>
                                            </div>
                                            <div>{photo.uploadTime}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Boş durum */}
                {uploadedPhotos.length === 0 && selectedFiles.length === 0 && (
                    <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl p-12 text-center border border-white/40">
                        <div className="max-w-md mx-auto">
                            <div className="mb-8 relative">
                                <div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                                    <Camera className="w-12 h-12 text-gray-400" />
                                </div>
                                <div className="absolute -top-2 -right-8 opacity-50">
                                    <Heart className="w-8 h-8 text-rose-300 animate-pulse" />
                                </div>
                                <div className="absolute -bottom-2 -left-8 opacity-50">
                                    <Star className="w-6 h-6 text-yellow-300 animate-bounce" />
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-600 mb-3">
                                Henüz Anı Yüklemedin
                            </h3>
                            <p className="text-gray-500 mb-6 leading-relaxed">
                                İlk fotoğraf veya videonu yükleyerek güzel anıların
                                koleksiyonunu başlat!
                                <br />
                                <span className="text-rose-500 font-medium">
                                    Sevgiyle dolu bir galeri oluşturalım ✨
                                </span>
                            </p>

                            <div className="flex justify-center space-x-4 opacity-60">
                                <Heart className="w-6 h-6 text-rose-300" />
                                <Camera className="w-6 h-6 text-blue-300" />
                                <Sparkles className="w-6 h-6 text-purple-300" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* CSS Animasyonları */}
            <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%) scale(0.8);
            opacity: 0;
          }
          to {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(244, 114, 182, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(244, 114, 182, 0.6);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f472b6, #ec4899);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #ec4899, #db2777);
        }

        /* Custom gradient borders */
        .gradient-border {
          position: relative;
          background: linear-gradient(white, white) padding-box,
            linear-gradient(45deg, #f472b6, #ec4899, #a855f7) border-box;
          border: 2px solid transparent;
        }

        /* Floating animation for decorative elements */
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        /* Enhanced hover effects */
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        /* Glass morphism effect */
        .glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Gradient animasyonları */
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes gradient-shift-reverse {
          0% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }

        @keyframes gradient-pulse {
          0%,
          100% {
            opacity: 0.3;
            background-size: 100% 100%;
          }
          50% {
            opacity: 0.7;
            background-size: 120% 120%;
          }
        }

        .animate-gradient-shift {
          background-size: 400% 400%;
          animation: gradient-shift 8s ease infinite;
        }

        .animate-gradient-shift-reverse {
          background-size: 400% 400%;
          animation: gradient-shift-reverse 12s ease infinite;
        }

        .animate-gradient-pulse {
          animation: gradient-pulse 6s ease-in-out infinite;
        }

        /* Loading spinner enhancement */
        .loading-spinner {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 3px solid #ffffff;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Photo gallery grid enhancement */
        .photo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        @media (max-width: 640px) {
          .photo-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
          }
        }

        /* Enhanced mobile responsiveness */
        @media (max-width: 480px) {
          .container-mobile {
            padding-left: 1rem;
            padding-right: 1rem;
          }

          .text-responsive {
            font-size: clamp(1.5rem, 4vw, 2rem);
          }

          .button-mobile {
            padding: 0.875rem 1.5rem;
            font-size: 1rem;
          }
        }
      `}</style>
        </div>
    );
};

export default WeddingPhotoApp;
