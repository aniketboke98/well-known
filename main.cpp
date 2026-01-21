////================================[#INCLUDE START]================================//
#include "Offset/SDK.hpp"
using namespace SDK;
using namespace std;
#include <android/native_window_jni.h>
#include <android/log.h>
#include "Main/Tools.h"
#include "Main/Dobby/Dobby.h"
#include "Main/Includes.h"
#include "Main/StrEnc.h"
#include "Main/Vector3.hpp"
#include "Main/Vector2.hpp"
#include "Main/MemoryTools.h"
#include "Main/KittyMemory/MemoryPatch.h"
#include "Main/android_native_app_glue.h"
#include "Main/obfuscate.h"
#include "Main/Eagle_GUI.h"
#include <curl/curl.h>
#include <openssl/rsa.h>
#include <openssl/pem.h>
#include <thread>
#include <chrono>
#include "Main/json.hpp"
#include "Main/oxorany.cpp"
#define XorStr(s) s
////================================[BOOL START]================================//
// bool bValid = false; // Moved to LoginKey.h
bool isLogin = false;
bool Expiry = false;
// static std::string EXP = ""; // Moved to LoginKey.h
// std::string g_Token, g_Auth; // Moved to LoginKey.h
using json = nlohmann::json;
android_app *g_App = 0;
ASTExtraPlayerCharacter *g_LocalPlayer=0;
ASTExtraPlayerController *g_PlayerController =0;
#include "LoginKey.h"
#define SLEEP_TIME 1000LL / 120LL
#define TSL_FONT_DEFAULT_SIZE 12
////================================[OFFSETS START]================================//
#define PI 3.14159265358979323846
#define RAD2DEG(x) ((float)(x) * (float)(180.f / PI))

uintptr_t GNames_Offset = 0x8103904;
uintptr_t GUObject_Offset = 0xdd91fa0;
uintptr_t GetActorArray = 0x9e70e64;
uintptr_t GNativeAndroidApp_Offset = 0xdad0280;
uintptr_t Actors_Offset = 0xA0;

int screenWidth = -1, glWidth, screenHeight = -1, glHeight;
float density = -1;
uintptr_t UE4;
////================================[FLOAT START]================================//
float screenSizeX = 0;
float screenSizeY = 0;
float FOVsize = 200;
float Speed_Aim = 1.2;
float recoilCompensationFactor = 1.0;
float Range = 150;
bool head;
bool Canvas = true;
bool Canvas1 = false;
bool Canvas2 = false;
bool AimHead = true;
bool AimBody = false;
int trackingType = 1;
int scopeAndFire = 0;
float FOVSizea;
//#define BONE_FOOT "foot_L"  // Ya "foot_R" (SDK se confirm karein)
bool ggxhit;
float 绘制距离 = 500;
////================================[AIM + TRIGGER CODE START]================================//
enum EAimMode {
    AimBullet = 0,
    Pbullet = 1,
    AimBot = 2
};
enum EAimTarget {
    Chest = 1,
    Head = 0
};
enum EAimBy {
    FOV = 0,
    Distance = 1
};
enum EAimTrigger {
    Shooting = 0,
    None = 1,
    Scoping = 2,
    Both = 3,
    Any = 4
};
////================================[SCONIG START]================================//
std::map<int, bool> itemConfig;

struct sConfig {
    bool Bypass;
    bool Enable;
    struct sPlayerESP {
        bool Line;
        bool Health;
        bool Skeleton;
        bool Name;
        bool Distance;
        bool TeamID;
        bool Grenade;
        bool Alert;
        bool Weapon;
        bool ItemEsp;
        bool Vehicle;
        bool OneClickEsp;
        bool MessageBox;
    };
    sPlayerESP PlayerESP{0};

    struct sVehicleESP {
        bool ShowVehicle;
        bool ShowDistance;
    };
    sVehicleESP VehicleESP{0};

    struct sAimMenu {
        bool Enable;
        bool AimBot;
        EAimMode Mode;
        EAimBy AimBy;
        EAimTarget Target;
        EAimTrigger Trigger;
        bool RecoilComparison;
        float Recc;
        bool RecoilSet;
        bool Radius;
        float Line;
        bool Prediction;
        float Cross;
        float Crosss;
        bool IgnoreKnocked;
        bool VisCheck;
        bool IgnoreBot;
        float AimSmooth = 1.0f;
    };
    sAimMenu SilentAim{0};
    sAimMenu AimBot{0};
};
sConfig Config{0};
////================================[WINNER CODE START]================================//
int (*MessageBoxExt)(unsigned int, const char16_t *, const char16_t *);
 
std::u16string convertToUtf16(const std::string &utf8str)
{
    std::wstring_convert<std::codecvt_utf8_utf16<char16_t>, char16_t> convert;
    return convert.from_bytes(utf8str);
}
std::string Fuck = "Info";
std::u16string f2 = convertToUtf16(Fuck);

std::string Fuck1 = "#1 Dynamic Always On Top";
std::u16string f3 = convertToUtf16(Fuck1);

std::string Op4 = "Winner Winner Chicken Dinner!\nFeedback: To Owner - Thanks for Playing ❤";
std::u16string xxx4 = convertToUtf16(Op4);

std::string Filepath = "/sdcard/Android/obb/com.pubg.imobile/key.lic";
const char *Gamepackage = "com.pubg.imobile";
////================================[UObject START]================================//
static bool isHead, isNeck, isPelvis, isLeftClavicle, isRightClavicle, 
            isLeftUpperArm, isLeftLowerArm, isLeftHand, isLeftThigh, 
            isLeftCalf, isLeftFoot, isRightUpperArm, isRightLowerArm, 
            isRightHand, isRightThigh, isRightCalf, isRightFoot, 
            isSpine1, isSpine2, isSpine3;
static int algorithm = 0;

struct sRegion
{
    uintptr_t start, end;
};

std::vector<sRegion> trapRegions;

bool isEqual(std::string s1, const char* check) {
    std::string s2(check);
    return (s1 == s2);
}

bool isObjectInvalid(UObject *obj)
{
    if (!Tools::IsPtrValid(obj))
    {
        return true;
    }
    if (!Tools::IsPtrValid(obj->ClassPrivate))
    {
        return true;
    }
    if (obj->InternalIndex <= 0)
    {
        return true;
    }
    if (obj->NamePrivate.ComparisonIndex <= 0)
    {
        return true;
    }
    if ((uintptr_t)(obj) % sizeof(uintptr_t) != 0x0 && (uintptr_t)(obj) % sizeof(uintptr_t) != 0x4)
    {
        return true;
    }
    if (std::any_of(trapRegions.begin(), trapRegions.end(), [obj](sRegion region) { return ((uintptr_t)obj) >= region.start && ((uintptr_t)obj) <= region.end; }) ||
        std::any_of(trapRegions.begin(), trapRegions.end(), [obj](sRegion region) { return ((uintptr_t)obj->ClassPrivate) >= region.start && ((uintptr_t)obj->ClassPrivate) <= region.end; }))
    {
        return true;
    }
    return false;
}
////================================[BOOL URL START]================================//
bool UrlLink;
int OpenURL(const char* url)
{
    JavaVM* java_vm = g_App->activity->vm;
    JNIEnv* java_env = NULL;

    jint jni_return = java_vm->GetEnv((void**)&java_env, JNI_VERSION_1_6);
    if (jni_return == JNI_ERR)
        return -1;

    jni_return = java_vm->AttachCurrentThread(&java_env, NULL);
    if (jni_return != JNI_OK)
        return -2;

    jclass native_activity_clazz = java_env->GetObjectClass(g_App->activity->clazz);
    if (native_activity_clazz == NULL)
        return -3;

    jmethodID method_id = java_env->GetMethodID(native_activity_clazz, "AndroidThunkJava_LaunchURL", "(Ljava/lang/String;)V");
    if (method_id == NULL)
        return -4;
        
    jstring retStr = java_env->NewStringUTF(url);
    java_env->CallVoidMethod(g_App->activity->clazz, method_id, retStr);

    jni_return = java_vm->DetachCurrentThread();
    if (jni_return != JNI_OK)
        return -5;

    return 0;
}
////================================[GUOBJECTARRY START]================================//
template<typename T>
void Write(uintptr_t addr, T value) {
WriteAddr((void *) addr, &value, sizeof(T));
}
void MemoryD_type(uintptr_t addr,int var){
WriteAddr(reinterpret_cast<void*>(addr),reinterpret_cast<void*>(&var),4);
}
void MemoryQ_type(uintptr_t addr,int var){
WriteAddr(reinterpret_cast<void*>(addr),reinterpret_cast<void*>(&var),32);
}

UWorld *GEWorld;
int GWorldNum = 0;
TUObjectArray gobjects;
UWorld *GetFullWorld()
{
    if(GWorldNum == 0) {
        gobjects = UObject::GUObjectArray->ObjObjects;
        for (int i=0; i< gobjects.Num(); i++)
            if (auto obj = gobjects.GetByIndex(i)) {
                if(obj->IsA(UEngine::StaticClass())) {
                    auto GEngine = (UEngine *) obj;
                    if(GEngine) {
                        auto ViewPort = GEngine->GameViewport;
                        if (ViewPort)
                        {
                            GEWorld = ViewPort->World;
                            GWorldNum = i;
                            if (!GEWorld || !GEWorld->NetDriver) {
                              g_LocalPlayer = nullptr;
                              g_PlayerController = nullptr;
                              return nullptr;
                              }
                            return ViewPort->World;
                        }
                    }
                }
            }
    }else {
        auto GEngine = (UEngine *) (gobjects.GetByIndex(GWorldNum));
        if(GEngine) {
            auto ViewPort = GEngine->GameViewport;
            if(ViewPort) {
                GEWorld = ViewPort->World;
                                            if (!GEWorld || !GEWorld->NetDriver) {
                              g_LocalPlayer = nullptr;
                              g_PlayerController = nullptr;
                              return nullptr;
                              }
                return ViewPort->World;
            }
        }
    }
    return 0;
}
////================================[GAME VIEW PORT START]================================//
static UGameViewportClient *GameViewport = 0;
UGameViewportClient *GetGameViewport() {
    while (!GameViewport) {
        GameViewport = UObject::FindObject<UGameViewportClient>("GameViewportClient Transient.UAEGameEngine_1.GameViewportClient_1");
        sleep(1);
    }
    if (GameViewport) {
        return GameViewport;
    }
    return 0;
}
////================================[GETACTORARRY START]================================//
std::vector<AActor *> GetActors() {
    auto World = GetFullWorld();
    if (!World)
    return std::vector<AActor *>();
    auto PersistentLevel = World->PersistentLevel;
    if (!PersistentLevel)
    return std::vector<AActor *>();
    struct GovnoArray {
    uintptr_t base;
    int32_t count;
    int32_t max;
    };
    static thread_local GovnoArray Actors{};
    Actors = *(((GovnoArray*(*)(uintptr_t))(UE4 + GetActorArray))(reinterpret_cast<uintptr_t>(PersistentLevel)));
    if (Actors.count <= 0) {
    return {};
    }
    std::vector<AActor *> actors;
    for (int i = 0; i < Actors.count; i++) {
    auto Actor = *(uintptr_t *) (Actors.base + (i * sizeof(uintptr_t)));
    if (Actor) {
    actors.push_back(reinterpret_cast<AActor *const>(Actor));
    }
    }
  return actors;
}
////================================[VECHILES NAME START]================================//
const char *GetVehicleName(ASTExtraVehicleBase *Vehicle) {
    switch (Vehicle->VehicleShapeType) {
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_Motorbike:
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_Motorbike_SideCart:
            return "Motorbike";
            break;
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_Dacia:
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_HeavyDacia:
            return "Dacia";
            break;
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_MiniBus:
            return "Mini Bus";
            break;
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_PickUp:
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_PickUp01:
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_HeavyPickup:
            return "Pick Up";
            break;
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_Buggy:
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_HeavyBuggy:
            return "Buggy";
            break;
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_UAZ:
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_UAZ01:
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_UAZ02:
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_UAZ03:
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_HeavyUAZ:
            return "UAZ";
            break;
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_PG117:
            return "PG117";
            break;
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_Aquarail:
            return "Aquarail";
            break;
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_Mirado:
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_Mirado01:
            return "Mirado";
            break;
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_Rony:
            return "Rony";
            break;
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_Scooter:
            return "Scooter";
            break;
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_SnowMobile:
            return "Snow Mobile";
            break;
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_TukTukTuk:
            return "Tuk Tuk";
            break;
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_SnowBike:
            return "Snow Bike";
            break;
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_Surfboard:
            return "Surf Board";
            break;
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_Snowboard:
            return "Snow Board";
            break;
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_Amphibious:
            return "Amphibious";
            break;
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_LadaNiva:
            return "Lada Niva";
            break;
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_UAV:
            return "UAV";
            break;
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_MegaDrop:
            return "Mega Drop";
            break;
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_Lamborghini:
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_Lamborghini01:
            return "Lamborghini";
            break;
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_GoldMirado:
            return "Gold Mirado";
            break;
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_BigFoot:
            return "Big Foot";
            break;
        case ESTExtraVehicleShapeType::ESTExtraVehicleShapeType__VST_HeavyUH60:
            return "UH60";
            break;
        default:
            return "Vehicle";
            break;
    }
    return "Vehicle";
}
////================================[GNAMES START]================================//
TNameEntryArray *GetGNames()
{
    return ((TNameEntryArray * (*)()) (UE4 + GNames_Offset))();
}

template <class T>
void GetAllActors(std::vector<T *> &Actors)
{
    UGameplayStatics *gGameplayStatics = (UGameplayStatics *)gGameplayStatics->StaticClass();
    auto GWorld = GetFullWorld();
    if (GWorld)
    {
        TArray<AActor *> Actors2;
        gGameplayStatics->GetAllActorsOfClass((UObject *)GWorld, T::StaticClass(), &Actors2);
        for (int i = 0; i < Actors2.Num(); i++)
        {
            Actors.push_back((T *)Actors2[i]);
        }
    }
}
////================================[COLOURS CODE START]================================//
FVector GetBoneLocationByName(ASTExtraPlayerCharacter *Actor, const char *BoneName)
{
    return Actor->GetBonePos(BoneName, FVector());
}
#define COLOR_IN FLinearColor(0, 0, 0, 0)
#define COLOR_BLACK FLinearColor(0, 0, 0, 1.f)
#define COLOR_WHITE FLinearColor(1.f, 1.f, 1.f, 1.f)
#define COLOR_RED FLinearColor(1.f, 0, 0, 1.f)
#define COLOR_CAR FLinearColor(1.f, 0.5f, 1.f, 1.f)
#define COLOR_GREEN FLinearColor(0.0f, 1.0f, .0f, 1.0f)
#define COLOR_ORANGE FLinearColor(1.f, 0.4f, 0, 1.f)
#define COLOR_ROSE FLinearColor(0.929f, 0.682f, 0.753f, 1.0f)
#define COLOR_YELLOW FLinearColor(1.f, 1.f, 0, 1.f)
#define COLOR_LIME FLinearColor(0, 1.f, 0, 1.f)
#define COLOR_BLUE FLinearColor(0, 0, 1.f, 1.f)
#define COLOR_THISTLE FLinearColor(1.0f, 0.74f, 0.84f, 1.0f)
#define COLOR_PINK FLinearColor(1.0f, 0.75f, 0.8f, 1.0f)
#define COLOR_CYAN FLinearColor(0.0f, 1.0f, 1.0f, 1.0f)
#define COLOR_OUTLINE FLinearColor(0.0f, 0.0f, 0.0f, 0.25f)
#define Black FLinearColor(0, 0, 0, 1.f)
#define White FLinearColor(1.f, 1.f, 1.f, 1.f)
#define Red   FLinearColor(1.f, 0, 0, 1.f)
#define Gray  FLinearColor(0, 1.f, 0, 1.f)
#define Blue  FLinearColor(0, 0, 1.f, 1.f)
#define Pink   FLinearColor(1.f, 0.5f, 1.f, 1.f)
#define Red FLinearColor(1.f, 0, 0, 0.7f)
#define Green FLinearColor(0, 0.5f, 0, 1.f)
#define Orange FLinearColor(1.f, 0.4f, 0, 1.f)
#define Purple FLinearColor(0.67f, 0.57f, 0.81f, 1.0f)
#define Yellow FLinearColor(1.f, 1.f, 0, 1.f)
#define BB FLinearColor(36 / 255.f, 249 / 255.f, 217 / 255.f, 0.0f);
////================================[SDK VECTOR START]================================//
SDK::FVector SubtractVectors(SDK::FVector a, SDK::FVector b) {
    SDK::FVector result;
    result.X = a.X - b.X;
    result.Y = a.Y - b.Y;
    result.Z = a.Z - b.Z;
    return result;
}

SDK::FVector AddVectors(SDK::FVector a, SDK::FVector b) {
    SDK::FVector result;
    result.X = a.X + b.X;
    result.Y = a.Y + b.Y;
    result.Z = a.Z + b.Z;
    return result;
}

SDK::FVector MultiplyVectors(SDK::FVector a, SDK::FVector b) {
    SDK::FVector result;
    result.X = a.X * b.X;
    result.Y = a.Y * b.Y;
    result.Z = a.Z * b.Z;
    return result;
}

SDK::FVector DivideVectors(SDK::FVector a, SDK::FVector b) {
    SDK::FVector result;
    result.X = a.X / b.X;
    result.Y = a.Y / b.Y;
    result.Z = a.Z / b.Z;
    return result;
}

SDK::FVector MultiplyVectorFloat(SDK::FVector a, float scalar) {
    SDK::FVector result;
    result.X = a.X * scalar;
    result.Y = a.Y * scalar;
    result.Z = a.Z * scalar;
    return result;
}

FRotator ToRotator2(FVector local, FVector target) {
    FVector Lund = SubtractVectors(target, local);
    FRotator newViewAngle;
    newViewAngle.Pitch =
            -std::atan2(Lund.Z, std::sqrt(Lund.X * Lund.X + Lund.Y * Lund.Y)) * (180.f / M_PI);
    newViewAngle.Yaw = std::atan2(Lund.Y, Lund.X) * (180.f / M_PI);
    newViewAngle.Roll = 0.f;
    if (newViewAngle.Yaw < 0.f) {
        newViewAngle.Yaw += 360.f;
    }
    return newViewAngle;
}

void VectorAnglesRadar(Vector3 &forward, FVector &angles) {
    if (forward.X == 0.f && forward.Y == 0.f) {
        angles.X = forward.Z > 0.f ? -360.f : 360.f;
        angles.Y = 0.f;
    } else {
        angles.X = RAD2DEG(atan2(-forward.Z, forward.Magnitude(forward)));
        angles.Y = RAD2DEG(atan2(forward.Y, forward.X));
    }
    angles.Z = 360.f;
}



FRotator ToRotator(FVector local, FVector target) {
FVector rotation = UKismetMathLibrary::Subtract_VectorVector(local, target);

float hyp = sqrt(rotation.X * rotation.X + rotation.Y * rotation.Y);

FRotator newViewAngle = {0};
newViewAngle.Pitch = -atan(rotation.Z / hyp) * (180.f / (float) 3.14159265358979323846);
newViewAngle.Yaw = atan(rotation.Y / rotation.X) * (180.f / (float) 3.14159265358979323846);
newViewAngle.Roll = (float) 0.f;

if (rotation.X >= 0.f)
newViewAngle.Yaw += 180.0f;

return newViewAngle;
}
void AimAngle(FRotator &angles) {
    if (angles.Pitch > 180)
        angles.Pitch -= 360;
    if (angles.Pitch < -180)
        angles.Pitch += 360;

    if (angles.Pitch < -75.f)
        angles.Pitch = -75.f;
    else if (angles.Pitch > 75.f)
        angles.Pitch = 75.f;

    while (angles.Yaw < -180.0f)
        angles.Yaw += 360.0f;
    while (angles.Yaw > 180.0f)
        angles.Yaw -= 360.0f;
}

bool W2S2(FVector worldPos, FVector2D *screenPos) {
return g_PlayerController->ProjectWorldLocationToScreen(worldPos, true, screenPos);
}


void DrawLine(UCanvas* Canvas, FVector2D Start, FVector2D End, FLinearColor Color, float Thickness)
{
    if (Canvas)
        Canvas->K2_DrawLine(Start, End, Thickness, Color);
}
////================================[FONT LOAD START]================================//
void *LoadFont(void *)
{
    while (!tslFontUI || !robotoFont)
    {
        tslFontUI = UObject::FindObject<UFont>("Font Roboto.Roboto");
        robotoFont = UObject::FindObject<UFont>("Font RobotoDistanceField.RobotoDistanceField");
        sleep(1);
    }
    return 0;
}

void NekoHook(FRotator &angles) {
    if (angles.Pitch > 180)
        angles.Pitch -= 360;
    if (angles.Pitch < -180)
        angles.Pitch += 360;

    if (angles.Pitch < -75.f)
        angles.Pitch = -75.f;
    else if (angles.Pitch > 75.f)
        angles.Pitch = 75.f;

    while (angles.Yaw < -180.0f)
        angles.Yaw += 360.0f;
    while (angles.Yaw > 180.0f)
        angles.Yaw -= 360.0f;
}
void NekoHook(float *angles) {
    if (angles[0] > 180)
        angles[0] -= 360;
    if (angles[0] < -180)
        angles[0] += 360;

    if (angles[0] < -75.f)
        angles[0] = -75.f;
    else if (angles[0] > 75.f)
        angles[0] = 75.f;

    while (angles[1] < -180.0f)
        angles[1] += 360.0f;
    while (angles[1] > 180.0f)
        angles[1] -= 360.0f;
}

void NekoHook(FVector2D angles) {
    if (angles.X > 180)
        angles.X -= 360;
    if (angles.X < -180)
        angles.X += 360;

    if (angles.X < -75.f)
        angles.X = -75.f;
    else if (angles.X > 75.f)
        angles.X = 75.f;

    while (angles.Y < -180.0f)
        angles.Y += 360.0f;
    while (angles.Y > 180.0f)
        angles.Y -= 360.0f;
}
////================================[INSIDE FOV CODE START]================================//
#define W2S(w, s) UGameplayStatics::ProjectWorldToScreen(g_PlayerController, w, true, s)
bool isInsideFOV(int x, int y) {
    int circle_x = screenWidth / 2;
    int circle_y = screenHeight / 2;
    int rad = (int) FOVsize;
    return (x - circle_x) * (x - circle_x) + (y - circle_y) * (y - circle_y) <= rad * rad;
}
auto GetTargetForAim()
{
    ASTExtraPlayerCharacter *result = 0;
    float max = std::numeric_limits<float>::infinity();
    auto Actors = GetActors();
    
    auto localPlayer = g_LocalPlayer;
    auto localPlayerController = g_PlayerController;
    
    if (localPlayer)
    {
        for (auto Actor : Actors)
        {
            if (isObjectInvalid(Actor))
                continue;
            if (Actor->IsA(ASTExtraPlayerCharacter::StaticClass()))
            {
                auto Player = (ASTExtraPlayerCharacter *)Actor;
                
                float dist = localPlayer->GetDistanceTo(Player) / 100.0f;    
                   if (dist > Range)
                    continue;
                    
                if (Player->PlayerKey == localPlayer->PlayerKey)
                    continue;

                if (Player->TeamID == localPlayer->TeamID)
                    continue;

                if (Player->bDead)
                    continue;


                if (Config.AimBot.IgnoreKnocked) {
                if (Player->Health == 0.0f)
                continue;
                }
                                                  
                if (Config.AimBot.IgnoreBot) {
                if (Player->bEnsure)
                continue;
                }
                        
                if (Config.AimBot.VisCheck) {
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager,Player->GetBonePos("Head", {0, 0, 0}), false))//头
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager,Player->GetBonePos("neck_01", {0, 0, 0}), false))//Neck
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager,Player->GetBonePos("upperarm_r", {0, 0, 0}), false))//上面的肩膀右
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager,Player->GetBonePos("upperarm_l", {0, 0, 0}), false))//上面的肩膀左
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager,Player->GetBonePos("lowerarm_r", {0, 0, 0}), false))//上面的手臂右
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager,Player->GetBonePos("lowerarm_l", {0, 0, 0}), false))//上面的手臂左
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager,Player->GetBonePos("spine_03", {0, 0, 0}), false))//脊柱3
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager,Player->GetBonePos("spine_02", {0, 0, 0}), false))//脊柱2
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager,Player->GetBonePos("spine_01", {0, 0, 0}), false))//脊柱2
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager,Player->GetBonePos("pelvis", {0, 0, 0}), false))//骨盆
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager,Player->GetBonePos("thigh_l", {0, 0, 0}), false))//大腿左
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager,Player->GetBonePos("thigh_r", {0, 0, 0}), false))//大腿右
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager,Player->GetBonePos("calf_l", {0, 0, 0}), false))//小腿左
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager,Player->GetBonePos("calf_r", {0, 0, 0}), false))//小腿右
                continue;

                static bool isSelected = false;
                algorithm = 0;
                isSelected = false;
                 

                
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager, Player->GetBonePos("Head", {0, 0, 0}),  false)) {//头
                 isHead = false;
                }else{
                 isHead = true;
                }
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager, Player->GetBonePos("pelvis", {0, 0, 0}),  false))
                {//骨盆
                 isPelvis = false;
                }else{
                 isPelvis = true;
                }
                                               
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager, Player->GetBonePos("neck_01", {0, 0, 0}),  false))
                {//Neck
                 isNeck = false;
                }else{
                 isNeck = true;
                }
                                                
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager, Player->GetBonePos("hand_l", {0, 0, 0}),  false))
                {//左手
                 isLeftHand = false;
                }else{
                 isLeftHand = true;
                }
                                                
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager, Player->GetBonePos("hand_r", {0, 0, 0}),  false))
                {//右手
                 isRightHand = false;
                }else{
                 isRightHand = true;
                }
                        
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager, Player->GetBonePos("foot_l", {0, 0, 0}),  false))
                {//左脚
                 isLeftFoot = false;
                }else{
                 isLeftFoot = true;
                }
                     
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager, Player->GetBonePos("foot_r", {0, 0, 0}),  false))
                {//右脚
                 isRightFoot = false;
                }else{
                 isRightFoot = true;
                }
                        
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager, Player->GetBonePos("calf_l", {0, 0, 0}),  false))
                {//左小腿
                 isLeftCalf = false;
                }else{
                 isLeftCalf = true;
                }
                        
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager, Player->GetBonePos("calf_r", {0, 0, 0}),  false))
                {//右小腿
                 isRightCalf = false;
                }else{
                 isRightCalf = true;
                }
                        
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager, Player->GetBonePos("lowerarm_l", {0, 0, 0}),  false))
                {//左小臂
                 isLeftLowerArm = false;
                }else{
                 isLeftLowerArm = true;
                }
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager, Player->GetBonePos("lowerarm_r", {0, 0, 0}),  false))
                {//右小臂
                 isRightLowerArm = false;
                }else{
                 isRightLowerArm = true;
                }
                        
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager, Player->GetBonePos("thigh_l", {0, 0, 0}),  false))
                {//左上臂
                 isLeftThigh = false;
                }else{
                 isLeftThigh = true;
                }
                if(!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager, Player->GetBonePos("thigh_r", {0, 0, 0}),  false))
                {//左上臂
                 isRightThigh = false;
                }else{
                 isRightThigh = true;
                }
                                                                                                
                if (!isSelected)
                if(isHead)
                {
                  algorithm = 1;
                  isSelected = true;
                }else{
                  isSelected = false;
                }
                if (!isSelected)
                if(isPelvis)
                {
                  algorithm = 2;
                  isSelected = true;
                }else{
                  isSelected = false;
                }
                if (!isSelected)
                if(isLeftCalf)
                {
                  algorithm = 3;
                  isSelected = true;
                }else{
                  isSelected = false;
                }
                if (!isSelected)
                if(isRightCalf)
                {
                  algorithm = 4;   
                  isSelected = true;
                }else{
                  isSelected = false;
                }
                if (!isSelected)
                if(isLeftLowerArm)
                {
                  algorithm = 5;
                  isSelected = true;
                }else{
                  isSelected = false;
                }
                if (!isSelected)
                if(isRightLowerArm)
                {
                  algorithm = 6;
                  isSelected = true;
                }else{
                  isSelected = false;
                }
                if (!isSelected)
                if(isLeftUpperArm)
                {
                  algorithm = 7;
                  isSelected = true;
                }else{
                  isSelected = false;
                }
                if (!isSelected)
                if(isRightUpperArm)
                {
                  algorithm = 8;
                  isSelected = true;
                }else{
                  isSelected = false;
                }
                if (!isSelected)
                if(isLeftThigh)
                {
                  algorithm = 9;
                  isSelected = true;
                }else{
                  isSelected = false;
                }
                if (!isSelected)
                if(isRightThigh)
                {
                  algorithm = 10;
                  isSelected = true;
                 }else{
                  isSelected = false;
                }
                if (!isSelected)
                if(isLeftFoot)
                {
                  algorithm = 11;
                  isSelected = true;
                }else{
                  isSelected = false;
                }
                if (!isSelected)
                if(isRightFoot)
                {
                  algorithm = 12;
                  isSelected = true;
                }else{
                  isSelected = false;
                }
                }

                if (trackingType == 0) {
                   float dist = localPlayer->GetDistanceTo(Player);
                   if (dist < max) {
                      max = dist;
                      result = Player;
                    }
                }
                
                if (trackingType == 1) {
                   auto Root = Player->GetBonePos("Root", {});
                   auto Head = Player->GetBonePos("Head", {});

                    FVector2D RootSc, HeadSc;
                     if (W2S(Root, &RootSc) && W2S(Head, &HeadSc))
                      {
                         float height = abs(HeadSc.Y - RootSc.Y);
                         float width = height * 0.65f;
                        FVector middlePoint = {HeadSc.X + (width / 2), HeadSc.Y + (height / 2),0};
                        if ((middlePoint.X >= 0 && middlePoint.X <= screenWidth) && (middlePoint.Y >= 0 && middlePoint.Y <= screenHeight))
                        {
                        FVector2D v2Middle = FVector2D((float)(screenWidth / 2), (float)(screenHeight / 2));
                        FVector2D v2Loc = FVector2D(middlePoint.X, middlePoint.Y);
                        if(isInsideFOV((int)middlePoint.X, (int)middlePoint.Y)) {
                           float dist = FVector2D::Distance(v2Middle, v2Loc);
                           if (dist < max) {
                                max = dist;
                                result = Player;
                               }                           
                            }
                        }
                    }
                }                
            }
        }
    }    
    return result;
};
bool isInsideFOVs(int x, int y)
{
    if (!Config.AimBot.Radius)
        return true;

    int circle_x = glWidth / 2;
    int circle_y = glHeight / 2;
    int rad = Config.AimBot.Radius;
    return (x - circle_x) * (x - circle_x) + (y - circle_y) * (y - circle_y) <= rad * rad;
}

auto GetTargetForAimBot()
{
    ASTExtraPlayerCharacter *result = nullptr;
    float max = std::numeric_limits<float>::infinity();
    auto Actors = GetActors();
    if (g_LocalPlayer)
    {
        for (int i = 0; i < Actors.size(); i++)
        {
            auto Actor = Actors[i];
            if (isObjectInvalid(Actor))
                continue;

            if (Actor->IsA(ASTExtraPlayerCharacter::StaticClass()))
            {
                auto Player = (ASTExtraPlayerCharacter *)Actor;

                float dist = g_LocalPlayer->GetDistanceTo(Player) / 100.0f;
                if (dist > 150.0f)
                    continue;

                if (Player->PlayerKey == g_PlayerController->PlayerKey)
                    continue;
                if (Player->TeamID == g_PlayerController->TeamID)
                    continue;
                if (Player->bDead)
                    continue;

                if (Config.AimBot.IgnoreKnocked)
                {
                    if (Player->Health == 0.0f)
                        continue;
                }

                if (Config.AimBot.VisCheck)
                {
                    if (!g_PlayerController->LineOfSightTo(g_PlayerController->PlayerCameraManager, Player->GetBonePos("Head", {}), true))
                        continue;
                }

                if (trackingType == 0) {
                   float dist = g_LocalPlayer->GetDistanceTo(Player);
                   if (dist < max) {
                      max = dist;
                      result = Player;
                    }
                }
                
                if (trackingType == 1) {
                   auto Root = Player->GetBonePos("Root", {});
                   auto Head = Player->GetBonePos("Head", {});

                    FVector2D RootSc, HeadSc;
                     if (W2S(Root, &RootSc) && W2S(Head, &HeadSc))
                      {
                         float height = abs(HeadSc.Y - RootSc.Y);
                         float width = height * 0.65f;
                        FVector middlePoint = {HeadSc.X + (width / 2), HeadSc.Y + (height / 2),0};
                        if ((middlePoint.X >= 0 && middlePoint.X <= screenWidth) && (middlePoint.Y >= 0 && middlePoint.Y <= screenHeight))
                        {
                        FVector2D v2Middle = FVector2D((float)(screenWidth / 2), (float)(screenHeight / 2));
                        FVector2D v2Loc = FVector2D(middlePoint.X, middlePoint.Y);
                        if(isInsideFOVs((int)middlePoint.X, (int)middlePoint.Y)) {
                           float dist = FVector2D::Distance(v2Middle, v2Loc);
                           if (dist < max) {
                                max = dist;
                                result = Player;
                               }                           
                            }
                        }
                    }
                }
            }
        }
    }
    return result;
}
////================================[PLAY SAFE CODE START]================================//
void RenderESP(UCanvas* Canvas, int ScreenWidth, int ScreenHeight)
{
    std::string datePart; // Declare outside so it's accessible
// ---- TOP UI TEXT DRAW ---- //
// ===== CUSTOM SAFE MESSAGE =====
datePart = "Play Safe Avoid Report !!";  // Fixed message

tslFontUI->LegacyFontSize = 15;
DrawOutlinedTextFPS(Canvas,
    FString(datePart.c_str()),
    { (float)screenWidth / 10 + screenWidth / 25.2f, 680 },
    COLOR_GREEN, COLOR_IN, true);
////================================[VERSION TITLE START]================================//
    std::string Version = "VERSION X64";
    tslFontUI->LegacyFontSize = 11;
    float charWidthVer = tslFontUI->LegacyFontSize * 0.8f;

    DrawText(Canvas,
        FString(Version.c_str()),
        { (float)screenWidth / 10 + screenWidth / 1.4f + charWidthVer, 680 },
        COLOR_GREEN, COLOR_IN,
        11, true);
////================================[ESP TITLE START]================================//
     if (Canvas1) {
    std::string Esp = "AIMBOT SERVER [OFF]";
    tslFontUI->LegacyFontSize = 23;
    float charWidthEsp = tslFontUI->LegacyFontSize * 0.8f;

    DrawText(Canvas,
        FString(Esp.c_str()),
        { (float)screenWidth - 305.0f - charWidthEsp, 650 },
        COLOR_YELLOW, COLOR_BLACK,
        15, true);
}
////================================[AIMBOT TITLE START]================================//
if (Config.AimBot.Enable) {
    std::string Esp = "AIMBOT SERVER [ON]";
    tslFontUI->LegacyFontSize = 23;
    float charWidthEsp = tslFontUI->LegacyFontSize * 0.8f;

    DrawText(Canvas,
        FString(Esp.c_str()),
        { (float)screenWidth - 305.0f - charWidthEsp, 650 },
        COLOR_YELLOW, COLOR_BLACK,
        15, true);
}
////================================[GWORLD START]================================//
ASTExtraPlayerCharacter *localPlayer = 0;
    ASTExtraPlayerController *localPlayerController = 0;

    screenWidth = ScreenWidth;
    screenHeight = ScreenHeight;


            auto Actors = GetActors();
            UGameplayStatics *gGameplayStatics = (UGameplayStatics *)UGameplayStatics::StaticClass();
            auto GWorld = GetFullWorld();
            if (GWorld)
            {
                UNetDriver *NetDriver = GWorld->NetDriver;
                if (NetDriver)
                {
                    UNetConnection *ServerConnection = NetDriver->ServerConnection;
                if (ServerConnection)
                {
                    localPlayerController = (ASTExtraPlayerController *)ServerConnection->PlayerController;
                }
            }
            }
            if (localPlayerController) {
                std::vector<ASTExtraPlayerCharacter *> PlayerCharacter;             
                GetAllActors(PlayerCharacter);
            for (auto actor = PlayerCharacter.begin();
                actor != PlayerCharacter.end(); actor++) {
                 auto Actor = *actor;
            if (Actor->PlayerKey ==((ASTExtraPlayerController *) localPlayerController)->PlayerKey) {
                 localPlayer = Actor;
                 break;
                }
            }
            if (localPlayer) {
            
if (localPlayer->PartHitComponent) {
auto ConfigCollisionDistSqAngles = localPlayer->PartHitComponent->ConfigCollisionDistSqAngles;
for (int j = 0; j < ConfigCollisionDistSqAngles.Num(); j++) {
ConfigCollisionDistSqAngles[j].Angle = 90.0f;
}
localPlayer->PartHitComponent->ConfigCollisionDistSqAngles = ConfigCollisionDistSqAngles;
}
////================================[AIMBOT CODE START]================================//
if (Config.AimBot.Enable) {
 			    ASTExtraPlayerCharacter *Target = GetTargetForAim();
				if (Target)
				{
                   bool triggerOk = false;
                if (scopeAndFire == 0) {
                   triggerOk = localPlayer->bIsWeaponFiring;
                 } else if (scopeAndFire == 1) {
                    triggerOk = localPlayer->bIsWeaponFiring || localPlayer->bIsGunADS;
                  } else triggerOk = true;
		      	if (triggerOk){
                       FVector targetAimPos;
                     if (AimHead) {
                       if(algorithm == 0) {
                        targetAimPos=Target->GetBonePos("Head", {});
                       } else if(algorithm == 1) {
                        targetAimPos = Target->GetBonePos("Head", {});
                       }else if(algorithm == 2){
                        targetAimPos = Target->GetBonePos("pelvis", {});//锁骨
                       }else if(algorithm == 3){
                        targetAimPos = Target->GetBonePos("calf_l", {});//左小腿
                       }else if(algorithm == 4){
                        targetAimPos = Target->GetBonePos("calf_r", {});//右小腿
                       }else if(algorithm == 5){
                        targetAimPos = Target->GetBonePos("lowerarm_l", {});//左小臂
                       }else if(algorithm == 6){
                        targetAimPos = Target->GetBonePos("lowerarm_r", {});//右小臂
                       }else if(algorithm == 7){
                        targetAimPos = Target->GetBonePos("upperarm_l", {});//左上臂
                       }else if(algorithm == 8){
                        targetAimPos = Target->GetBonePos("upperarm_r", {});//右上臂
                       }else if(algorithm == 9) {
                        targetAimPos = Target->GetBonePos("thigh_l", {});//左大腿
                       }else if(algorithm == 10) {
                        targetAimPos = Target->GetBonePos("thigh_r", {});//右大腿
                       }else if(algorithm == 11) {
                        targetAimPos = Target->GetBonePos("foot_l", {});//左脚
                       }else if(algorithm == 12){
                        targetAimPos = Target->GetBonePos("foot_r", {});//右脚
                       }
                     }
                     if(AimBody){
                       if(algorithm == 0) {
                        targetAimPos = Target->GetBonePos("Head", {});//头
                       }else if(algorithm == 1) {
                        targetAimPos = Target->GetBonePos("spine_03", {});//Neck
                       }else if(algorithm == 2){
                        targetAimPos = Target->GetBonePos("pelvis", {});//屁股
                       }else if(algorithm == 3){
                        targetAimPos = Target->GetBonePos("calf_l", {});//左小腿
                       }else if(algorithm == 4){
                        targetAimPos = Target->GetBonePos("calf_r", {});//右小腿
                       }else if(algorithm == 5){
                        targetAimPos = Target->GetBonePos("lowerarm_l", {});//左小臂
                       }else if(algorithm == 6){
                        targetAimPos = Target->GetBonePos("lowerarm_r", {});//右小臂
                       }else if(algorithm == 7){
                        targetAimPos = Target->GetBonePos("upperarm_l", {});//左上臂
                       }else if(algorithm == 8){
                        targetAimPos = Target->GetBonePos("upperarm_r", {});//右上臂
                       }else if(algorithm == 9) {
                        targetAimPos = Target->GetBonePos("thigh_l", {});//左大腿
                       }else if(algorithm == 10) {
                        targetAimPos = Target->GetBonePos("thigh_r", {});//右大腿
                       }else if(algorithm == 11) {
                        targetAimPos = Target->GetBonePos("foot_l", {});//左脚
                       }else if(algorithm == 12){
                        targetAimPos = Target->GetBonePos("foot_r", {});//右脚
                        }
                     }
			         auto WeaponManagerComponent = localPlayer->WeaponManagerComponent;
                     if (WeaponManagerComponent)
                     {
                        auto propSlot = WeaponManagerComponent->GetCurrentUsingPropSlot();
                        if ((int)propSlot.GetValue() >= 1 && (int)propSlot.GetValue() <= 3)
                        {
                          auto CurrentWeaponReplicated = (ASTExtraShootWeapon *)WeaponManagerComponent->CurrentWeaponReplicated;
                          if (CurrentWeaponReplicated)
                          {
                                auto ShootWeaponComponent = CurrentWeaponReplicated->ShootWeaponComponent;
                              if (ShootWeaponComponent)
                              {
                                UShootWeaponEntity *ShootWeaponEntityComponent = ShootWeaponComponent->ShootWeaponEntityComponent;
                              if (ShootWeaponEntityComponent)
                              {
                                 ASTExtraVehicleBase *CurrentVehicle = Target->CurrentVehicle;
                                 float dist = localPlayer->GetDistanceTo(Target);
                                 auto timeToTravel = dist / ShootWeaponEntityComponent->BulletRange;
                              if (CurrentVehicle)
                              {
                                 FVector LinearVelocity = CurrentVehicle->ReplicatedMovement.LinearVelocity;
                                 targetAimPos = UKismetMathLibrary::Add_VectorVector(targetAimPos, UKismetMathLibrary::Multiply_VectorFloat(LinearVelocity, timeToTravel));
                               }else{
                                 FVector Velocity = Target->GetVelocity();
                                 targetAimPos = UKismetMathLibrary::Add_VectorVector(targetAimPos, UKismetMathLibrary::Multiply_VectorFloat(Velocity, timeToTravel));
                               }
                            
                               if (localPlayer->bIsWeaponFiring)
                               {
                                 float dist = localPlayer->GetDistanceTo(Target) / 100.f;
                                 targetAimPos.Z -= dist * recoilCompensationFactor;
                                }
                            
                                     FVector fDir = UKismetMathLibrary::Subtract_VectorVector(targetAimPos, g_PlayerController->PlayerCameraManager->CameraCache.POV.Location);
                                     FRotator Yaptr = UKismetMathLibrary::Conv_VectorToRotator(fDir);
                                
                                     FRotator CpYaT = g_PlayerController->PlayerCameraManager->CameraCache.POV.Rotation;
                                
                                     Yaptr.Pitch -= CpYaT.Pitch;
                                     Yaptr.Yaw -= CpYaT.Yaw;
                                     Yaptr.Roll = 0.f;
                                     NekoHook(Yaptr);
                                
                                     CpYaT.Pitch += Yaptr.Pitch / Speed_Aim; // Aim X Speed Make Float : Xs
                                     CpYaT.Yaw += Yaptr.Yaw / Speed_Aim; // Aim Y Speed Make Float : Ys
                                     CpYaT.Roll = 0.f;
                                
                                      g_PlayerController->SetControlRotation(CpYaT, "");
                                      }
                                   }
                                }
                             }
                          }
                      }
                   }
               }
////================================[PLAYER (OR) BOT DIFFERENCE CODE START]================================//
int totalEnemies = 0, totalBots = 0;
                std::vector<ASTExtraPlayerCharacter *> PlayerCharacter;
                GetAllActors(PlayerCharacter);
                for (auto actor = PlayerCharacter.begin(); actor != PlayerCharacter.end(); actor++)
                {

                auto Player = *actor;
                if (Player->PlayerKey == localPlayer->PlayerKey)
                    continue;
                if (Player->TeamID == localPlayer->TeamID)
                    continue;
                if (Player->bDead)
                    continue;
                if (Player->bHidden)
                    continue;
                                                                
                if (!Player->RootComponent)
                    continue;
                
                if (Player->bEnsure)
                 totalBots++;
                 else totalEnemies++;
                        
                float Distance = localPlayer->GetDistanceTo(Player) / 100.0f;
                if (Distance > 绘制距离)
                continue;            
                                                
                FVector HeadPos = GetBoneLocationByName(Player,"Head");
                FVector2D HeadPosSC;
                FVector RootPos = GetBoneLocationByName(Player,"Root");
                FVector2D RootPosSC;
                FVector Root = GetBoneLocationByName(Player,"Root");
                FVector Spin = GetBoneLocationByName(Player,"pelvis");
                FVector Spin2 = GetBoneLocationByName(Player,"spine_03");
                FVector pelvis = GetBoneLocationByName(Player,"pelvis");
                FVector2D pelvisPoSC;
                FVector upper_r = GetBoneLocationByName(Player,"upperarm_r");
                FVector2D upper_rPoSC;
                FVector lowerarm_r = GetBoneLocationByName(Player,"lowerarm_r");
                FVector2D lowerarm_rPoSC;
                FVector lowerarm_l = GetBoneLocationByName(Player,"lowerarm_l");
                FVector2D lowerarm_lSC;
                FVector hand_r = GetBoneLocationByName(Player,"hand_r");
                FVector2D hand_rPoSC;
                FVector upper_l = GetBoneLocationByName(Player,"upperarm_l");
                FVector2D upper_lPoSC;
                FVector hand_l = GetBoneLocationByName(Player,"hand_l");
                FVector2D hand_lPoSC;
                FVector thigh_l = GetBoneLocationByName(Player,"thigh_l");
                FVector2D thigh_lPoSC;
                FVector calf_l = GetBoneLocationByName(Player,"calf_l");
                FVector2D calf_lPoSC;
                FVector foot_l = GetBoneLocationByName(Player,"foot_l");
                FVector2D foot_lPoSC;
                FVector thigh_r = GetBoneLocationByName(Player,"thigh_r");
                FVector2D thigh_rPoSC;
                FVector calf_r = GetBoneLocationByName(Player,"calf_r");
                FVector2D calf_rPoSC;
                FVector foot_r = GetBoneLocationByName(Player,"foot_r");
                FVector2D foot_rPoSC;
                FVector neck_01 = GetBoneLocationByName(Player,"neck_01");
                FVector2D neck_01PoSC;
                FVector spine_01 = GetBoneLocationByName(Player,"spine_01");
                FVector2D spine_01PoSC;
                FVector spine_02 = GetBoneLocationByName(Player,"spine_02");
                FVector2D spine_02PoSC;
                FVector spine_03 = GetBoneLocationByName(Player,"spine_03");
                FVector2D spine_03PoSC;
                if (gGameplayStatics->ProjectWorldToScreen(g_PlayerController, HeadPos, false, &HeadPosSC) &&
                    gGameplayStatics->ProjectWorldToScreen(g_PlayerController, lowerarm_l, false, &lowerarm_lSC) &&
                    gGameplayStatics->ProjectWorldToScreen(g_PlayerController, upper_r, false, &upper_rPoSC) &&
                    gGameplayStatics->ProjectWorldToScreen(g_PlayerController, upper_l, false, &upper_lPoSC) &&
                    gGameplayStatics->ProjectWorldToScreen(g_PlayerController, lowerarm_r, false, &lowerarm_rPoSC) &&
                    gGameplayStatics->ProjectWorldToScreen(g_PlayerController, hand_r, false, &hand_rPoSC) &&
                    gGameplayStatics->ProjectWorldToScreen(g_PlayerController, hand_l, false, &hand_lPoSC) &&
                    gGameplayStatics->ProjectWorldToScreen(g_PlayerController, thigh_l, false, &thigh_lPoSC) &&
                    gGameplayStatics->ProjectWorldToScreen(g_PlayerController, calf_l, false, &calf_lPoSC) &&
                    gGameplayStatics->ProjectWorldToScreen(g_PlayerController, foot_l, false, &foot_lPoSC) &&
                    gGameplayStatics->ProjectWorldToScreen(g_PlayerController, thigh_r, false, &thigh_rPoSC) &&
                    gGameplayStatics->ProjectWorldToScreen(g_PlayerController, calf_r, false, &calf_rPoSC) &&
                    gGameplayStatics->ProjectWorldToScreen(g_PlayerController, foot_r, false, &foot_rPoSC) &&
                    gGameplayStatics->ProjectWorldToScreen(g_PlayerController, neck_01, false, &neck_01PoSC) &&
                    gGameplayStatics->ProjectWorldToScreen(g_PlayerController, pelvis, false, &pelvisPoSC) &&
                    gGameplayStatics->ProjectWorldToScreen(g_PlayerController, RootPos, false, &RootPosSC) &&
                    gGameplayStatics->ProjectWorldToScreen(g_PlayerController, spine_01, false, &spine_01PoSC) &&
                    gGameplayStatics->ProjectWorldToScreen(g_PlayerController, spine_02, false, &spine_02PoSC) &&
                    gGameplayStatics->ProjectWorldToScreen(g_PlayerController, spine_03, false, &spine_03PoSC)) {
////================================[PLAYER SKELETON START]================================//
bool IsVisible = g_PlayerController->LineOfSightTo(Player, {0,0,0}, true);
if (Config.PlayerESP.Skeleton) {
static std::vector<std::string> right_arm{"neck_01", "clavicle_r", "upperarm_r", "lowerarm_r", "hand_r"};
static std::vector<std::string> left_arm{"neck_01", "clavicle_l", "upperarm_l", "lowerarm_l", "hand_l"};
static std::vector<std::string> spine{"Head", "neck_01", "spine_01", "pelvis"};
static std::vector<std::string> lower_right{"pelvis", "thigh_r", "calf_r", "foot_r"};
static std::vector<std::string> lower_left{"pelvis", "thigh_l", "calf_l", "foot_l"};
static std::vector<std::vector<std::string>> skeleton{right_arm, left_arm, spine, lower_right, lower_left};
if (!Player || !Canvas || !localPlayerController) {
return;
}
static std::unordered_map<std::string, int> boneToIndex;
static std::vector<std::string> boneNames;
static bool bInitialized = false;
if (!bInitialized) {
int index = 0;
boneNames.reserve(32);
for (const auto& boneStructure : skeleton) {
for (const auto& bone : boneStructure) {
if (boneToIndex.emplace(bone, index).second) {
boneNames.push_back(bone);
++index;
}
}
}
bInitialized = true;
}
std::vector<FVector> boneLocations(boneNames.size());
for (auto &v : boneLocations) {
    v.X = 0.0f;
    v.Y = 0.0f;
    v.Z = 0.0f;
}
for (size_t i = 0; i < boneNames.size(); ++i) {
boneLocations[i] = GetBoneLocationByName(Player, boneNames[i].c_str());
}
std::vector<std::pair<FVector2D, bool>> screenPositions(boneNames.size(), {FVector2D(0, 0), false});
for (size_t i = 0; i < boneNames.size(); ++i) {
FVector2D screenPos;
bool bProjected = gGameplayStatics->ProjectWorldToScreen(localPlayerController, boneLocations[i], false, &screenPos);
bool bOnScreen = bProjected &&
screenPos.X >= -200 && screenPos.X <= Canvas->SizeX + 200 &&
screenPos.Y >= -200 && screenPos.Y <= Canvas->SizeY + 200;
screenPositions[i] = {screenPos, bOnScreen};
}
FLinearColor lineColor = IsVisible ? 
(Player->bEnsure ? White : Green) : 
(Player->bEnsure ? COLOR_CYAN : Red);
for (auto& boneStructure : skeleton) {
std::string lastBone;
for (const std::string& currentBone : boneStructure) {
if (!lastBone.empty()) {
int lastBoneIndex = boneToIndex[lastBone];
int currentBoneIndex = boneToIndex[currentBone];
if (screenPositions[lastBoneIndex].second && screenPositions[currentBoneIndex].second) {
DrawLine(Canvas, screenPositions[lastBoneIndex].first, screenPositions[currentBoneIndex].first, 1.0f, lineColor);
}
}
lastBone = currentBone;
}
}
}            
if (Config.PlayerESP.Skeleton) {
    constexpr float HeadOffsetY = 10.0f;
    constexpr float StartLineY = 80.0f;
    FVector2D targetPos = { HeadPosSC.X, HeadPosSC.Y - HeadOffsetY };  // Just above head
    FVector2D screenCenter = { static_cast<float>(screenWidth) / 2.0f, StartLineY };
    const bool bIsBot = Player->bEnsure;
    const FLinearColor lineColor = IsVisible
        ? (bIsBot ? COLOR_WHITE : COLOR_GREEN)
        : (bIsBot ? COLOR_CYAN : COLOR_RED);
    DrawLine(Canvas, screenCenter, targetPos, 1.5f, lineColor);
}
////================================[ESP LINE + FIST OR GUN IN HAND CODE START]================================//
if (Config.PlayerESP.Name) {
    FVector BelowRoot = Root;
    BelowRoot.Z -= 55.0f;
    FVector2D BelowRootSc;
    if (gGameplayStatics->ProjectWorldToScreen(localPlayerController, BelowRoot, false, &BelowRootSc)) {
        std::wstring wsName;
        std::wstring wsDist;
        std::wstring wsFullInfo;
        if (Player->bEnsure) {
            // Bot
            wsName = L"Bot";
            wsDist = std::to_wstring((int)Distance) + L"M";   // ✅ bot ke liye bhi distance set
        } else {
            // Player
            std::wstring wsTeam = L"(" + std::to_wstring(Player->TeamID) + L")";
            wsName = Player->PlayerName.ToWString();
            wsFullInfo = wsTeam + L" - " + wsName;
            wsDist = std::to_wstring((int)Distance) + L"M";
        }
        // Adjust font size by distance
        tslFontUI->LegacyFontSize = std::max(5, 12 - (int)(Distance / 80));
        if (Player->bEnsure) {
            // Draw Bot name
            DrawOutlinedTextFPS(Canvas,
                FString(wsName),   // "Bot"
                FVector2D(BelowRootSc.X, BelowRootSc.Y + 10),
                COLOR_GREEN, COLOR_IN, true);
            // Bot distance
            if (!wsDist.empty()) {
                DrawOutlinedTextFPS(Canvas,
                    FString(wsDist),
                    FVector2D(BelowRootSc.X, BelowRootSc.Y + 30),
                    COLOR_WHITE, COLOR_IN, true);
            }
        } else {
            // Player Name + Team
            DrawOutlinedTextFPS(Canvas,
                FString(wsFullInfo),
                FVector2D(BelowRootSc.X, BelowRootSc.Y + 10),
                COLOR_YELLOW, COLOR_IN, true);
            // Player distance
            if (!wsDist.empty()) {
                DrawOutlinedTextFPS(Canvas,
                    FString(wsDist),
                    FVector2D(BelowRootSc.X, BelowRootSc.Y + 30),
                    COLOR_WHITE, COLOR_IN, true);
            }
            // Weapon Info
            if (Config.PlayerESP.Grenade) {
                std::string wep = "";
                if (auto WeaponManagerComponent = Player->WeaponManagerComponent) {
                    auto PropSlot = WeaponManagerComponent->GetCurrentUsingPropSlot();
                    if ((int)PropSlot.GetValue() >= 1 && (int)PropSlot.GetValue() <= 3) {
                        if (auto CurrentWeaponReplicated = WeaponManagerComponent->CurrentWeaponReplicated) {
                            wep = CurrentWeaponReplicated->GetWeaponName().ToString();
                        }
                    }
                }
                // Convert std::string → std::wstring
                std::wstring wwep(wep.begin(), wep.end());
                // Default green
                FLinearColor color = FLinearColor(0.f, 1.f, 0.071f, 1.f);
                // Cyan for actual weapons
                if (
                    wep != "Fist" &&
                    wep != "BP_ShotGun_M1014_C" &&
                    wep != "BP_WEP_Sickle_C" &&
                    wep != "BP_WEP_Machete_C" &&
                    wep != "BP_WEP_Cowbar_C" &&
                    wep != "BP_WEP_Pan_C" &&
                    wep != "BP_WEP_Zombie59_Gloves_C" &&
                    wep != "BP_Grenade_Apple_Weapon_C" &&
                    wep != "BP_Other_CrossBow_C" &&
                    wep != "BP_Grenade_Shoulei_Weapon_C" &&
                    wep != "BP_Grenade_Smoke_Weapon_C" &&
                    wep != "BP_Grenade_Burn_Weapon_C"
                ) {
                    color = FLinearColor(0.f, 1.f, 1.f, 1.f);  // Cyan
                }
                DrawOutlinedTextFPS(Canvas,
                    FString(wwep),
                    FVector2D(BelowRootSc.X, BelowRootSc.Y + 50),
                    color, COLOR_IN, true);
            }
        }
    }
}
////================================[HEALTH BAR CODE START]================================//
if (Config.PlayerESP.Health) {
    auto AboveHead = Player->GetHeadLocation(true);
    AboveHead.Z += 35.f;
    FVector2D AboveHeadSc;

    if (gGameplayStatics->ProjectWorldToScreen(localPlayerController, AboveHead, false, &AboveHeadSc)) {
        float yOffset = std::min(Distance * 0.05f, 30.f);

        // ESP HEALTH BAR
        float CurHP = std::max(0.f, std::min(Player->Health, Player->HealthMax));
        float MaxHP = Player->HealthMax;
        FLinearColor ColorHP;

        float healthRatio = CurHP / MaxHP;
        if (healthRatio > 0.7f) {
            ColorHP = {0.f, 1.f, 0.f, 1.f};
        } else if (healthRatio > 0.4f) {
            ColorHP = {1.f, 1.f, 0.f, 1.f};
        } else if (healthRatio > 0.1f) {
            ColorHP = {1.f, 0.f, 0.f, 1.f};
        } else {
            ColorHP = {0.5f, 0.f, 0.5f, 1.f};
        }

        if (CurHP == 0 && !Player->bDead) {
            ColorHP = {1.f, 0, 0, 1.f};
            CurHP = Player->NearDeathBreath;
            USTCharacterNearDeathComp *NearDeathComponent = Player->NearDeatchComponent;
            if (NearDeathComponent) {
                MaxHP = NearDeathComponent->BreathMax;
            }
        }

        auto HealthBarPos = AboveHeadSc;
        HealthBarPos.Y += 10 - yOffset;

        float mWidthScale = std::min(0.1f * Distance, 35.f);
        float mWidth = ((75.f - mWidthScale) * 1.15f) * 0.7f;   
        float mHeight = (((mWidth * 0.175f) * 0.6f) * 0.85f) * 1.2f; // ✅ 20% height increase

        HealthBarPos.X -= (mWidth / 2);
        HealthBarPos.Y -= (mHeight * 1.5f);

        // Background (black)
        DrawFilledRect(Canvas, {HealthBarPos.X, HealthBarPos.Y}, mWidth, mHeight, {0.f, 0.f, 0.f, 0.6f});

        // Health bar (fill inside background)
        DrawFilledRect(Canvas, {HealthBarPos.X, HealthBarPos.Y}, (CurHP * mWidth / MaxHP), mHeight, ColorHP);

        // ✅ L-corner edges (smaller, based on bar size)
        float lineLen = std::max(3.0f, mWidth * 0.1f);  // bar ke hisaab se length
        float thickness = 1.5f;

        FLinearColor edgeColor = {1.f, 1.f, 1.f, 1.f}; // white edges

        // Top-left
        DrawLine(Canvas, {HealthBarPos.X, HealthBarPos.Y}, {HealthBarPos.X + lineLen, HealthBarPos.Y}, edgeColor, thickness);
        DrawLine(Canvas, {HealthBarPos.X, HealthBarPos.Y}, {HealthBarPos.X, HealthBarPos.Y + lineLen}, edgeColor, thickness);

        // Top-right
        DrawLine(Canvas, {HealthBarPos.X + mWidth, HealthBarPos.Y}, {HealthBarPos.X + mWidth - lineLen, HealthBarPos.Y}, edgeColor, thickness);
        DrawLine(Canvas, {HealthBarPos.X + mWidth, HealthBarPos.Y}, {HealthBarPos.X + mWidth, HealthBarPos.Y + lineLen}, edgeColor, thickness);

        // Bottom-left
        DrawLine(Canvas, {HealthBarPos.X, HealthBarPos.Y + mHeight}, {HealthBarPos.X + lineLen, HealthBarPos.Y + mHeight}, edgeColor, thickness);
        DrawLine(Canvas, {HealthBarPos.X, HealthBarPos.Y + mHeight}, {HealthBarPos.X, HealthBarPos.Y + mHeight - lineLen}, edgeColor, thickness);

        // Bottom-right
        DrawLine(Canvas, {HealthBarPos.X + mWidth, HealthBarPos.Y + mHeight}, {HealthBarPos.X + mWidth - lineLen, HealthBarPos.Y + mHeight}, edgeColor, thickness);
        DrawLine(Canvas, {HealthBarPos.X + mWidth, HealthBarPos.Y + mHeight}, {HealthBarPos.X + mWidth, HealthBarPos.Y + mHeight - lineLen}, edgeColor, thickness);
    }
}
}
}
if (Config.PlayerESP.MessageBox)
{
    static bool hasTriggered = false; // Add a flag to control execution
    
    if (!hasTriggered) // Check if the code has already been executed
    {
        std::vector<ASTExtraGameStateBase*> ChickenBase;
        GetAllActors(ChickenBase);

        for (auto actor = ChickenBase.begin(); actor != ChickenBase.end(); actor++) {
            auto InGame = *actor;
            
            if ((int)InGame->AliveTeamNum == 1)
            {
                MessageBoxExt(0, (char16_t *)xxx4.c_str(), (char16_t *)f3.c_str());
                hasTriggered = true; // Set the flag to true to prevent re-execution
                break; // Exit the loop after execution
            }
        }
    }
}
////================================[VECHILE ESP CODE START]================================//
if (Config.PlayerESP.Vehicle) {                
    std::vector<ASTExtraVehicleBase*> VehicleBase;
    GetAllActors(VehicleBase);
    
    for (auto actor = VehicleBase.begin(); actor != VehicleBase.end(); actor++) {
        auto Vehicle = *actor;
        if (!Vehicle->Mesh)
            continue;
        if (!Vehicle->RootComponent)
            continue;
        
        float Distance = Vehicle->GetDistanceTo(localPlayer) / 100.f;
        if (Distance > 500)
            continue;
        
        FVector2D VehiclePos;
        if (gGameplayStatics->ProjectWorldToScreen(g_PlayerController, Vehicle->RootComponent->RelativeLocation, false, &VehiclePos)) {
            std::string vehicleText = GetVehicleName(Vehicle); // Vehicle name
            std::string finalText = vehicleText + " [" + std::to_string((int)Distance) + "M]"; // Name + Distance
            
            // Adjust font size based on distance
            tslFontUI->LegacyFontSize = max(6, 12 - (int)(Distance / 80));
            
            // Draw final text (single line)
            DrawOutlinedTextFPS(Canvas, FString(finalText.c_str()), 
                FVector2D(VehiclePos.X, VehiclePos.Y), 
                COLOR_RED, COLOR_IN, true);
        }
    }
}
////================================[ITEMS CODE START]================================//                  
if (Config.PlayerESP.ItemEsp) {
    std::vector<APickUpListWrapperActor*> LootboxBase;
    GetAllActors(LootboxBase);

    for (auto actor = LootboxBase.begin(); actor != LootboxBase.end(); actor++) {
        auto Pick = *actor;

        if (!Pick || !Pick->RootComponent)
            continue;

        float Distance = Pick->GetDistanceTo(localPlayer) / 100.0f;

        if (Distance > 100.0f) // ✅ Range ab 100m
            continue;

        FVector2D PickUpListsPos;

        if (W2S(Pick->K2_GetActorLocation(), &PickUpListsPos)) {
            // Format: Lootbox [50M]
            std::string lootBoxText = "Lootbox [" + std::to_string((int)Distance) + "M]";

            // Distance ke hisaab se font resize (7 se 12 ke beech)
            int fontSize = (int)(12 - (Distance / 50));
            tslFontUI->LegacyFontSize = std::clamp(fontSize, 7, 12);

            // Lootbox + Distance ek line mai
            DrawOutlinedTextFPS(Canvas, FString(lootBoxText.c_str()), {PickUpListsPos.X, PickUpListsPos.Y}, COLOR_GREEN, COLOR_IN, true);
        }
    }
}
////================================[GRENADE WARNING START]================================//
if (Config.PlayerESP.Grenade) {
    std::vector<ASTExtraGrenadeBase*> allGrenades;
    GetAllActors(allGrenades);

FVector myPos;
if (localPlayer->RootComponent)
    myPos = localPlayer->RootComponent->RelativeLocation;
else {
    myPos.X = 0.0f;
    myPos.Y = 0.0f;
    myPos.Z = 0.0f;
}

    for (auto* grenade : allGrenades) {
        if (!grenade || !grenade->RootComponent || grenade->bHidden || grenade->IsActorBeingDestroyed())
            continue;

        FVector grenadePos = grenade->RootComponent->RelativeLocation;
        FVector delta = grenadePos - myPos;
        float distance = sqrtf(delta.X * delta.X + delta.Y * delta.Y + delta.Z * delta.Z) / 100.0f;

        if (distance > 100.f)
            continue;

        FVector2D screenPos;
        if (!W2S(grenadePos, &screenPos))
            continue;

        std::string name = grenade->GetName();
        std::string label;
        FLinearColor color = COLOR_YELLOW;
        bool drawLine = true;

        // 🎯 Frag Grenade
        if (name.find("Frag") != std::string::npos) {
            label = "Frag Grenade - [" + std::to_string((int)distance) + "M]";
            color = COLOR_RED;
        }

        // 🎯 Smoke Grenade
        else if (name.find("Smoke") != std::string::npos) {
            label = "Smoke Grenade - [" + std::to_string((int)distance) + "M]";
            color = COLOR_WHITE;
            drawLine = false;  // ✅ No line for smoke
        }

        // 🎯 Molotov / Burn
        else if (name.find("Burn") != std::string::npos || name.find("Molotov") != std::string::npos) {
            label = "Molotov - [" + std::to_string((int)distance) + "M]";
            color = COLOR_GREEN;
        }

        // 🔕 Skip unknown types
        else {
            continue;
        }

        tslFontUI->LegacyFontSize = 10;

        // ✅ Draw line if allowed
        if (drawLine) {
            FVector2D playerScreen;
            if (W2S(myPos, &playerScreen)) {
            Canvas->K2_DrawLine(playerScreen, screenPos, 1.5f, COLOR_RED);  // Unreal's native
            }
        }

        // ✅ Draw text
        DrawOutlinedTextFPS(Canvas, FString(label), screenPos, color, COLOR_OUTLINE, true);
    }
 }  
 ////================================[ENEMY COUNT START]================================//
 g_LocalPlayer = localPlayer;
g_PlayerController = localPlayerController;
//SkinBox = true;

std::string playerInfo;

if (totalEnemies > 0 || totalBots > 0) {
    // When enemies or bots exist
    playerInfo = std::to_string(totalEnemies) + " | " + std::to_string(totalBots);

    tslFontUI->LegacyFontSize = 12;

    float posX = (float)screenWidth / 2;
    float posY = 70.0f;

    float padding = 20.0f;
    float bgWidth = (playerInfo.length() * 12.0f) + (padding * 2);
    float bgHeight = 30.0f;

    // 🔴 Draw Red Background
    DrawFilledRect(Canvas,
                   FVector2D(posX - bgWidth / 2, posY - bgHeight / 2),
                   bgWidth, bgHeight,
                   FLinearColor(0.f, 1.f, 0.f, 1.f));

    // White text
    float textOffsetX = (playerInfo.length() * 1.0f);
    DrawOutlinedTextFPS(Canvas, FString(playerInfo),
                        FVector2D(posX - textOffsetX, posY),
                        FLinearColor(1.f, 0.f, 1.f, 1.f),
                        FLinearColor(0.f, 0.f, 0.f, 0.f),
                        true);
} else {
    // ✅ No enemies or bots
    playerInfo = "CLEAR";

    tslFontUI->LegacyFontSize = 12;

    float posX = (float)screenWidth / 2;
    float posY = 70.0f;

    float padding = 20.0f;
    float bgWidth = (playerInfo.length() * 12.0f) + (padding * 2);
    float bgHeight = 30.0f;

    // 🟡 Draw Yellow Background
    DrawFilledRect(Canvas,
                   FVector2D(posX - bgWidth / 2, posY - bgHeight / 2),
                   bgWidth, bgHeight,
                   FLinearColor(1.f, 1.f, 0.f, 1.f));

    // Black text
    float textOffsetX = (playerInfo.length() * 1.0f);
    DrawOutlinedTextFPS(Canvas, FString(playerInfo),
                        FVector2D(posX - textOffsetX, posY),
                        FLinearColor(0.f, 0.f, 0.f, 1.f),
                        FLinearColor(0.f, 0.f, 0.f, 0.f),
                        true);
}}}
////================================[MOD NAME CODE START]================================//
if (Canvas) {
    char Menunamee[256];
    sprintf(Menunamee, OBFUSCATE("@tfcheats"));

    // Dynamically adjust font size based on screen width
    int screenWidth = Canvas->SizeX;
    int screenHeight = Canvas->SizeY;
    
    // Set font size proportionally (e.g., 4% of screen width)
    tslFontUI->LegacyFontSize = screenWidth * 0.012f; // Adjust multiplier as needed

    // Calculate text width dynamically
    int textWidthMenunamee = strlen(Menunamee) * tslFontUI->LegacyFontSize * 0.1f; // Adjust multiplier for better fitting

    // Center text dynamically
    int centerX = screenWidth / 2;
    int menunameePositionX = centerX - (textWidthMenunamee / 2);
    
    // Adjust vertical position relative to screen height
    int menunameePositionY = screenHeight * 0.16f; // 8% from the top

    // Draw text with outline
    DrawOutlinedTextFPS(Canvas, Menunamee, {menunameePositionX, menunameePositionY}, COLOR_GREEN, COLOR_IN, true);
}}
////================================[LOGIN KEY SYSTEM START]================================//
#include <string>
#include <thread>
#include <chrono>
#include <cstring>

bool fileExists(const std::string &filePath){
std::ifstream file(filePath);
return file.good();
}
bool isFileEmpty(const std::string &filePath){
std::ifstream file(filePath);
return file.peek() == std::ifstream::traits_type::eof();
}
bool directoryExists(const std::string &path){
DIR *dir = opendir(path.c_str());
if (dir){
closedir(dir);
return true;
}else{
return false;
}
}
// --- Globals jo pehle se honi chahiye ---
static char keyForLogin[64];
void GetKey(){
char keypath[256];
sprintf(keypath, "/sdcard/Android/obb/%s/Key.lic", Gamepackage);
int fd = open(keypath, O_RDONLY);
read(fd, &keyForLogin, sizeof(keyForLogin));
close(fd);
}
void logError(const char *errorMessage){
char filePath[256];
sprintf(filePath, "/sdcard/Android/obb/%s/Error.txt", Gamepackage);
int fileDescriptor = open(filePath, O_WRONLY | O_CREAT | O_TRUNC, 0666);
if (fileDescriptor != -1){
write(fileDescriptor, errorMessage, strlen(errorMessage));
write(fileDescriptor, "\n", 1);
close(fileDescriptor);
}
}
bool saveClipboardTextToFile(const char *filePath, const char *clipboardText){
int fd = open(filePath, O_WRONLY | O_CREAT | O_TRUNC, 0644);
if (fd == -1){
return false;
}
size_t len = std::strlen(clipboardText);
ssize_t written = write(fd, clipboardText, len);
if (written != len){
return false;
}
close(fd);
return true;
}

void *LoginThread(void *arg)
{
    while (!g_App)
    {
        sleep(1);
    }
    std::string ClipboardText;
    std::string Keystatus;
    std::ofstream keyFile;

    do {
        if (!fileExists(Filepath.c_str()))
        {
            ClipboardText = getClipboardText();

            if (ClipboardText.empty()) {
                logError("Clipboard is empty.");
                exit(0);
            }

            keyFile.open(Filepath);

            if (!keyFile) {
                logError("Failed to create or open key.lic file.");
                exit(0);
            }

            keyFile << ClipboardText;
            keyFile.close();
        }
        GetKey();
        if (fileExists(Filepath.c_str()) && !isFileEmpty(Filepath.c_str())) {
            if (!isLogin) {
                Keystatus = Login(keyForLogin, "SIDU1", "PUBG");
                if (Keystatus == "OK") {
                    isLogin = bValid && g_Auth == g_Token;
                    if (bValid && g_Auth == g_Token) {
						
			
		
                    } else {
                        logError("nhi hoga");
                        exit(0);
                    }
                } else {
                    logError(Keystatus.c_str());
                    system("rm -rf /sdcard/Android/obb/com.pubg.imobile/key.lic");
                    exit(1);
                }
            } else {
                logError("already True (:");
                exit(0);
            }
        } else {
            logError("Key file not found.");
            exit(0);
        }
    } while (Keystatus != "OK");

    return nullptr;
}
////================================[POSTRENDER IDX START]================================//
void *(*orig_PostRender)(UGameViewportClient* ViewportClient, UCanvas* Canvas);
void *new_PostRender(UGameViewportClient* ViewportClient, UCanvas* Canvas) {
    RenderESP(Canvas, Canvas->SizeX, Canvas->SizeY);
    return orig_PostRender(ViewportClient, Canvas);
}

void PostrenderDraw() {
    auto GViewport = GetGameViewport();
    if (GViewport) {
        int postrender_idx = 134;
        auto f_mprotect = [](uintptr_t addr, size_t len, int32_t prot) -> int32_t {
            static_assert(PAGE_SIZE == 4096);
            constexpr size_t page_size = static_cast<size_t>(PAGE_SIZE);
            void* start = reinterpret_cast<void*>(addr & -page_size);
            uintptr_t end = (addr+len+page_size - 1) & -page_size;
            return mprotect(start, end - reinterpret_cast<uintptr_t>(start), prot);
        };
        auto VTable = (void **)GViewport->VTable;
        if (VTable && (VTable[postrender_idx] != new_PostRender)) {
            orig_PostRender = decltype(orig_PostRender)(VTable[postrender_idx]);
            f_mprotect((uintptr_t)(&VTable[postrender_idx]), sizeof(uintptr_t), PROT_READ | PROT_WRITE);
            VTable[postrender_idx] = (void *)new_PostRender;
        }
    }
}
////================================[CRASH FIXER START]================================//
void FixGameCrash() {
        system("rm -rf /data/data/com.pubg.imobile/files/");
        system("rm -rf /data/data/com.pubg.imobile/files/obblib");
        system("touch /data/data/com.pubg.imobile/files/obblib");
        system("chmod 000 /data/data/com.pubg.imobile/files/obblib");
        system("rm -rf /data/data/com.pubg.imobile/files/xlog");
        system("touch /data/data/com.pubg.imobile/files/xlog");
        system("chmod 000 /data/data/com.pubg.imobile/files/xlog");
        system("rm -rf /data/data/com.pubg.imobile/app_bugly");
        system("touch /data/data/com.pubg.imobile/app_bugly");
        system("chmod 000 /data/data/com.pubg.imobile/app_bugly");
        system("rm -rf /data/data/com.pubg.imobile/app_crashrecord");
        system("touch /data/data/com.pubg.imobile/app_crashrecord");
        system("chmod 000 /data/data/com.pubg.imobile/app_crashrecord");
        system("rm -rf /data/data/com.pubg.imobile/app_crashSight");
        system("touch /data/data/com.pubg.imobile/app_crashSight");
        system("chmod 000 /data/data/com.pubg.imobile/app_crashSight");
		system("rm -rf /data/data/com.pubg.imobile/files/ano_tmp");
        system("touch /data/data/com.pubg.imobile/files/ano_tmp");
        system("chmod 000 /data/data/com.pubg.imobile/files/ano_tmp");
  }
////================================[BAN FIXER START]================================//
  void banfixer() {
        system("rm -rf /data/data/com.pubg.imobile/shared_prefs");
        system("mkdir /data/data/com.pubg.imobile/shared_prefs");
        system("chmod 777 /data/data/com.pubg.imobile/shared_prefs");
        system("rm -rf /data/data/com.pubg.imobile/files");
        system("rm -rf /data/data/com.pubg.imobile/databases");
        system("rm -rf /data/data/com.pubg.imobile/files/login-identifier.txt");
        system("rm -rf /data/data/com.pubg.imobile/files/UE4Game/ShadowTrackerExtra/ShadowTrackerExtra/Intermediate");
        system("rm -rf /data/data/com.pubg.imobile/files/UE4Game/ShadowTrackerExtra/ShadowTrackerExtra/Intermediate");
        system("rm -rf /data/data/com.pubg.imobile/files/TGPA");
        system("rm -rf /data/data/com.pubg.imobile/files/TGPA");
        system("rm -rf /data/data/com.pubg.imobile/files/ProgramBinaryCache");
        system("rm -rf /data/data/com.pubg.imobile/files/ProgramBinaryCache");
        system("chmod -R 000 /data/data/com.pubg.imobile/files/ano_tmp/ano.ano3.dat");

 }
 ////================================[GNATIVEANDRIODAPP CODE START]================================//
 void *Dynamic(void *) {

FixGameCrash();
banfixer();

    while (!UE4) {
        UE4 = Tools::GetBaseAddress("libUE4.so");
        sleep(1);
    }    

    while (!g_App) {
        g_App = *(android_app * *)(UE4 + GNativeAndroidApp_Offset);
        
        sleep(1);
    }
   *(uintptr_t *)&MessageBoxExt = UE4 + 0x7F2C2AC;
    FName::GNames = GetGNames();
    while (!FName::GNames) {
        FName::GNames = GetGNames();
        sleep(1);
    }
    UObject::GUObjectArray = (FUObjectArray * )(UE4 + GUObject_Offset);
    static bool loadFont = false;
    if (!loadFont)
    {
        pthread_t t;
        pthread_create(&t, 0, LoadFont, 0);
        loadFont = true;
    }
    PostrenderDraw();
    ////================================[YES FOR AIMBOT MESSAGE BOX START]================================//
    std::string Op1 = "OnlyEsp Activated Successfully";
    std::u16string xxx1 = convertToUtf16(Op1);
    std::string Op2 = "Aimbot Server Activated Successfully";
    std::u16string xxx2 = convertToUtf16(Op2);
    std::string Op3 = "1. Yes = Aimbot Server \n2. No = OnlyEsp Server";
    std::u16string xxx3 = convertToUtf16(Op3);
////================================[AIMBOT MESSAGE BOX START]================================//
	if (MessageBoxExt(1, (char16_t *)xxx3.c_str(), (char16_t *)f2.c_str()) == 1)
    {
      
		Config.PlayerESP.Line = true;
        Config.PlayerESP.Skeleton = true;
        Config.PlayerESP.Health = true;
        Config.PlayerESP.Name = true;
        Config.PlayerESP.Distance = true;
        Config.PlayerESP.TeamID = true;
        Config.PlayerESP.Vehicle = true;
        Config.PlayerESP.Grenade = true;
        Config.PlayerESP.Weapon = true;
        Config.PlayerESP.ItemEsp = true;
        Config.AimBot.Enable = true;  
        Config.AimBot.Radius = true;
        Config.AimBot.RecoilSet = 1.1f;             
        Config.AimBot.IgnoreKnocked = true;
        Config.AimBot.VisCheck = true;
        FOVSizea = 150.f;
		Canvas2 = true;
		Config.PlayerESP.MessageBox = true;
////================================[ESP MESSAGE BOX START]================================//
        MessageBoxExt(0, (char16_t *)xxx2.c_str(), (char16_t *)f2.c_str());
    }
    else
    {
	 	Canvas1 = true;
		Config.PlayerESP.Line = true;
        Config.PlayerESP.Skeleton = true;
        Config.PlayerESP.Health = true;
        Config.PlayerESP.Name = true;
        Config.PlayerESP.Distance = true;
        Config.PlayerESP.TeamID = true;
        Config.PlayerESP.Vehicle = true;
        Config.PlayerESP.Grenade = true;
        Config.PlayerESP.Weapon = true;
        Config.PlayerESP.ItemEsp = true;
		Config.PlayerESP.MessageBox = true;
        MessageBoxExt(0, (char16_t *)xxx1.c_str(), (char16_t *)f2.c_str());
    }
    return 0;  
    
}
////================================[LOGIN THREAD START]================================//
__attribute__((constructor)) void _init() {
    pthread_t Ptid;
    pthread_create(&Ptid, 0,Dynamic, 0);
    pthread_create(&Ptid, 0,LoginThread, 0);
	
	}
////================================[THE END]================================//
