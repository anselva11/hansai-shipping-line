Add-Type -AssemblyName System.Drawing

$width = 2800
$height = 1350

$bmp = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)

$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# 1. Fill entire canvas with PURE WHITE (#FFFFFF)
$g.Clear([System.Drawing.Color]::White)

# Soft ground shadow at bottom
$shadowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(25, 0, 0, 0))
$g.FillEllipse($shadowBrush, 200, 1280, 2400, 60)
$shadowBrush.Dispose()

# Load logo
$logoPath = "c:\Users\Ansel\Documents\Hansai Shipping Line\Assets\logo-white.png"
$logoBmp = $null
if ([System.IO.File]::Exists($logoPath)) {
    $logoBmp = [System.Drawing.Bitmap]::FromFile($logoPath)
}

# ==============================================================================
# GEOMETRY DEFINITIONS (True Perspective matching reference image)
# ==============================================================================
# Green Container Door (Left Face):
# Top-Left: (320, 200), Bottom-Left: (320, 840)
# Top-Right: (720, 95),  Bottom-Right: (720, 785)
$doorTL = New-Object System.Drawing.PointF(320, 200)
$doorTR = New-Object System.Drawing.PointF(720, 95)
$doorBR = New-Object System.Drawing.PointF(720, 785)
$doorBL = New-Object System.Drawing.PointF(320, 840)

# Green Container Long Side (Front Face):
# Top-Left: (720, 95),  Bottom-Left: (720, 785)
# Top-Right: (2460, 240), Bottom-Right: (2460, 890)
$sideTL = New-Object System.Drawing.PointF(720, 95)
$sideTR = New-Object System.Drawing.PointF(2460, 240)
$sideBR = New-Object System.Drawing.PointF(2460, 890)
$sideBL = New-Object System.Drawing.PointF(720, 785)

# ==============================================================================
# 1. DRAW LEFT CONTAINER IN BACKGROUND PERSPECTIVE (Far Left)
# ==============================================================================
$leftFacePts = @(
    (New-Object System.Drawing.PointF(0, 360)),
    (New-Object System.Drawing.PointF(315, 205)),
    (New-Object System.Drawing.PointF(315, 845)),
    (New-Object System.Drawing.PointF(0, 950))
)
$leftBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 30, 45, 34))
$g.FillPolygon($leftBrush, $leftFacePts)
$leftBrush.Dispose()

# Vertical ribs on left container
for ($lx = 20; $lx -lt 310; $lx += 32) {
    $rT = 360 - ($lx * 0.5)
    $rB = 950 - ($lx * 0.35)
    $rBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 42, 60, 46))
    $g.FillRectangle($rBrush, $lx, $rT, 18, ($rB - $rT))
    $rBrush.Dispose()
}

# ==============================================================================
# 2. DRAW RIGHT REAR CONTAINER IN BACKGROUND (Far Right)
# ==============================================================================
$rightFacePts = @(
    (New-Object System.Drawing.PointF(2455, 330)),
    (New-Object System.Drawing.PointF(2800, 310)),
    (New-Object System.Drawing.PointF(2800, 1100)),
    (New-Object System.Drawing.PointF(2455, 1100))
)
$rightBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 205, 212, 216))
$g.FillPolygon($rightBrush, $rightFacePts)
$rightBrush.Dispose()

# Ribs on right rear container
for ($rx = 2470; $rx -lt 2800; $rx += 42) {
    $rBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 230, 235, 238))
    $g.FillRectangle($rBrush, $rx, 310, 26, 790)
    $rBrush.Dispose()
}

# ==============================================================================
# 3. DRAW BOTTOM STACKED CONTAINER (WHITE)
# ==============================================================================
# White Door (Left Face):
$wDoorTL = New-Object System.Drawing.PointF(320, 842)
$wDoorTR = New-Object System.Drawing.PointF(720, 788)
$wDoorBR = New-Object System.Drawing.PointF(720, 1340)
$wDoorBL = New-Object System.Drawing.PointF(320, 1340)
$wDoorBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 190, 198, 204))
$g.FillPolygon($wDoorBrush, @($wDoorTL, $wDoorTR, $wDoorBR, $wDoorBL))
$wDoorBrush.Dispose()

# White Long Side (Front Face):
$wSideTL = New-Object System.Drawing.PointF(720, 788)
$wSideTR = New-Object System.Drawing.PointF(2460, 892)
$wSideBR = New-Object System.Drawing.PointF(2460, 1340)
$wSideBL = New-Object System.Drawing.PointF(720, 1340)
$wSideBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 215, 222, 226))
$g.FillPolygon($wSideBrush, @($wSideTL, $wSideTR, $wSideBR, $wSideBL))
$wSideBrush.Dispose()

# Corrugated Ribs on White Container
$whiteRibCount = 48
$wStepX = ($wSideTR.X - $wSideTL.X) / $whiteRibCount
for ($i = 0; $i -lt $whiteRibCount; $i++) {
    $t = $i / $whiteRibCount
    $rx = $wSideTL.X + ($i * $wStepX)
    $ryTop = $wSideTL.Y + ($t * ($wSideTR.Y - $wSideTL.Y))
    $ribW = [Math]::Max(14, ($wStepX * 0.65))
    
    # White rib trough shadow
    $shadowPen = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 175, 184, 190))
    $g.FillRectangle($shadowPen, $rx, $ryTop + 14, 5, (1340 - $ryTop - 14))
    $shadowPen.Dispose()

    # White rib crest (pure white highlight)
    $crestBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
    $g.FillRectangle($crestBrush, $rx + 5, $ryTop + 14, $ribW, (1340 - $ryTop - 14))
    $crestBrush.Dispose()
}

# White container stencils on front face
$stencilFont = New-Object System.Drawing.Font("Arial", 16, [System.Drawing.FontStyle]::Bold)
$stencilBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 130, 142, 150))
$g.DrawString("Cargo container", $stencilFont, $stencilBrush, 820, 825)
$g.DrawString("No. 025387162/53", $stencilFont, $stencilBrush, 820, 850)
$stencilFont.Dispose()
$stencilBrush.Dispose()

# Ambient shadow cast by top container onto bottom white container
$topCastShadow = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(140, 0, 0, 0))
$g.FillPolygon($topCastShadow, @(
    (New-Object System.Drawing.PointF(320, 842)),
    (New-Object System.Drawing.PointF(720, 788)),
    (New-Object System.Drawing.PointF(2460, 892)),
    (New-Object System.Drawing.PointF(2460, 925)),
    (New-Object System.Drawing.PointF(720, 825)),
    (New-Object System.Drawing.PointF(320, 875))
))
$topCastShadow.Dispose()


# ==============================================================================
# 4. DRAW TOP CONTAINER (GREEN - MAIN HERO CONTAINER)
# ==============================================================================

# A. Door End (Left Face):
$doorBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 42, 62, 48))
$g.FillPolygon($doorBrush, @($doorTL, $doorTR, $doorBR, $doorBL))
$doorBrush.Dispose()

# Door Panel Seam (Center vertical division between two door leaves)
$centerDoorX = ($doorTL.X + $doorTR.X) / 2
$centerDoorTopY = ($doorTL.Y + $doorTR.Y) / 2
$centerDoorBotY = ($doorBL.Y + $doorBR.Y) / 2
$doorSeamPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 20, 32, 24), 6)
$g.DrawLine($doorSeamPen, $centerDoorX, $centerDoorTopY, $centerDoorX, $centerDoorBotY)
$doorSeamPen.Dispose()

# Vertical Door Locking Bars (4 Steel Rods)
$barXList = @(
    $doorTL.X + (($doorTR.X - $doorTL.X) * 0.22),
    $doorTL.X + (($doorTR.X - $doorTL.X) * 0.40),
    $doorTL.X + (($doorTR.X - $doorTL.X) * 0.62),
    $doorTL.X + (($doorTR.X - $doorTL.X) * 0.80)
)
foreach ($bx in $barXList) {
    $t = ($bx - $doorTL.X) / ($doorTR.X - $doorTL.X)
    $byT = $doorTL.Y + ($t * ($doorTR.Y - $doorTL.Y))
    $byB = $doorBL.Y + ($t * ($doorBR.Y - $doorBL.Y))
    
    # Locking bar shadow
    $barShadowPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, 10, 18, 12), 10)
    $g.DrawLine($barShadowPen, $bx - 2, $byT, $bx - 2, $byB)
    $barShadowPen.Dispose()

    # Locking bar metallic rod
    $barPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 175, 185, 180), 6)
    $g.DrawLine($barPen, $bx, $byT, $bx, $byB)
    $barPen.Dispose()

    # Latch Handles and Cam brackets
    $camBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 70, 80, 75))
    $g.FillRectangle($camBrush, $bx - 8, $byT + 20, 16, 24)
    $g.FillRectangle($camBrush, $bx - 8, $byB - 40, 16, 24)
    # Mid-height door handle
    $g.FillRectangle($camBrush, $bx - 18, (($byT + $byB) / 2) - 10, 24, 20)
    $camBrush.Dispose()
}

# Door Hinges (4 heavy hinges on left corner post)
for ($hi = 0; $hi -lt 4; $hi++) {
    $hy = $doorTL.Y + 60 + ($hi * 160)
    $hingeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 24, 38, 28))
    $g.FillRectangle($hingeBrush, $doorTL.X - 6, $hy, 22, 28)
    $pinBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 140, 150, 145))
    $g.FillRectangle($pinBrush, $doorTL.X + 2, $hy + 4, 8, 20)
    $hingeBrush.Dispose()
    $pinBrush.Dispose()
}


# B. Front Long Face (Corrugated Wall):
$sideBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 52, 76, 58))
$g.FillPolygon($sideBrush, @($sideTL, $sideTR, $sideBR, $sideBL))
$sideBrush.Dispose()

# Draw 46 photorealistic vertical corrugation ribs
$ribCount = 46
$stepX = ($sideTR.X - $sideTL.X) / $ribCount

for ($i = 0; $i -lt $ribCount; $i++) {
    $t = $i / $ribCount
    $rx = $sideTL.X + ($i * $stepX)
    $ryTop = $sideTL.Y + ($t * ($sideTR.Y - $sideTL.Y))
    $ryBot = $sideBL.Y + ($t * ($sideBR.Y - $sideBL.Y))
    $ribH = $ryBot - $ryTop
    
    $ribW = [Math]::Max(16, ($stepX * 0.62))

    # Trough shadow (ambient occlusion depression)
    $troughBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 32, 48, 36))
    $g.FillRectangle($troughBrush, $rx, $ryTop + 22, 6, $ribH - 44)
    $troughBrush.Dispose()

    # Front rib crest (illuminated steel face)
    $crestBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.PointF($rx + 6, 0)),
        (New-Object System.Drawing.PointF($rx + 6 + $ribW, 0)),
        [System.Drawing.Color]::FromArgb(255, 78, 112, 88),
        [System.Drawing.Color]::FromArgb(255, 58, 86, 66)
    )
    $g.FillRectangle($crestBrush, $rx + 6, $ryTop + 22, $ribW, $ribH - 44)
    $crestBrush.Dispose()

    # Specular sunlight line down center of rib
    $specPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(120, 140, 185, 155), 1.5)
    $g.DrawLine($specPen, $rx + 10, $ryTop + 23, $rx + 10, $ryBot - 23)
    $specPen.Dispose()
}

# Heavy Top Side Rail of Green Container
$topRailBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.PointF(0, 90)),
    (New-Object System.Drawing.PointF(0, 120)),
    [System.Drawing.Color]::FromArgb(255, 95, 135, 105),
    [System.Drawing.Color]::FromArgb(255, 42, 62, 48)
)
$g.FillPolygon($topRailBrush, @(
    $sideTL,
    $sideTR,
    (New-Object System.Drawing.PointF($sideTR.X, $sideTR.Y + 24)),
    (New-Object System.Drawing.PointF($sideTL.X, $sideTL.Y + 24))
))
$topRailBrush.Dispose()

# Heavy Bottom Side Rail of Green Container
$botRailBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 28, 42, 32))
$g.FillPolygon($botRailBrush, @(
    (New-Object System.Drawing.PointF($sideTL.X, $sideBL.Y - 24)),
    (New-Object System.Drawing.PointF($sideTR.X, $sideBR.Y - 24)),
    $sideBR,
    $sideBL
))
$botRailBrush.Dispose()

# Structural Corner Posts:
# Left Corner Post (at division between door and front face)
$cornerPostBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 36, 54, 42))
$g.FillRectangle($cornerPostBrush, $sideTL.X - 10, $sideTL.Y - 4, 22, ($sideBL.Y - $sideTL.Y + 8))
$cornerPostBrush.Dispose()

# Right Corner Post
$g.FillRectangle($cornerPostBrush, $sideTR.X - 12, $sideTR.Y - 4, 24, ($sideBR.Y - $sideTR.Y + 8))

# Top-Left Corner Casting (ISO Heavy Steel Corner Block with Hole)
$castBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 62, 88, 70))
$g.FillRectangle($castBrush, $sideTL.X - 16, $sideTL.Y - 14, 34, 34)
$holeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 16, 24, 18))
$g.FillEllipse($holeBrush, $sideTL.X - 7, $sideTL.Y - 6, 16, 18)
$castBrush.Dispose()
$holeBrush.Dispose()

# Bottom-Left Corner Casting
$castBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 62, 88, 70))
$g.FillRectangle($castBrush, $sideTL.X - 16, $sideBL.Y - 14, 34, 34)
$holeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 16, 24, 18))
$g.FillEllipse($holeBrush, $sideTL.X - 7, $sideBL.Y - 6, 16, 18)
$castBrush.Dispose()
$holeBrush.Dispose()

# Bottom-Right Corner Casting
$castBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 62, 88, 70))
$g.FillRectangle($castBrush, $sideTR.X - 16, $sideBR.Y - 14, 34, 34)
$holeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 16, 24, 18))
$g.FillEllipse($holeBrush, $sideTR.X - 7, $sideBR.Y - 6, 16, 18)
$castBrush.Dispose()
$holeBrush.Dispose()


# ==============================================================================
# 5. CONTAINER STENCILS (Left side of front face - exact match to reference)
# ==============================================================================
$stFont1 = New-Object System.Drawing.Font("Arial", 20, [System.Drawing.FontStyle]::Regular)
$stFont2 = New-Object System.Drawing.Font("Arial", 22, [System.Drawing.FontStyle]::Bold)
$stBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 200, 220, 205))

$g.DrawString("Cargo container", $stFont1, $stBrush, 850, 160)
$g.DrawString("No. 025387162/53", $stFont2, $stBrush, 850, 192)

# Recycling Triangle Stencil '50'
$triPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(220, 200, 220, 205), 3)
$triPts = @(
    (New-Object System.Drawing.PointF(885, 340)),
    (New-Object System.Drawing.PointF(920, 395)),
    (New-Object System.Drawing.PointF(850, 395))
)
$g.DrawPolygon($triPen, $triPts)
$triFont = New-Object System.Drawing.Font("Arial", 14, [System.Drawing.FontStyle]::Bold)
$g.DrawString("50", $triFont, $stBrush, 874, 365)
$triPen.Dispose()
$triFont.Dispose()

# ISO Specification block
$isoFont = New-Object System.Drawing.Font("Arial", 13, [System.Drawing.FontStyle]::Bold)
$g.DrawString("MAX. GROSS   32,500 KG  71,650 LBS", $isoFont, $stBrush, 850, 430)
$g.DrawString("TARE WT.      3,980 KG   8,770 LBS", $isoFont, $stBrush, 850, 452)
$g.DrawString("PAYLOAD      28,520 KG  62,880 LBS", $isoFont, $stBrush, 850, 474)
$g.DrawString("CUBE           76.4 CBM   2,700 CU.FT.", $isoFont, $stBrush, 850, 496)
$isoFont.Dispose()

$stFont1.Dispose()
$stFont2.Dispose()
$stBrush.Dispose()


# ==============================================================================
# 6. OFFICIAL HANSAI BRANDING (From logo-white.png)
# ==============================================================================
# In the reference image, /AXION spans boldly across the right ribs.
# We draw the official HANSAI logo from logo-white.png!
if ($logoBmp -ne $null) {
    # Logo dimensions: 1943 x 477. We draw it large and crisp at width 820px:
    $lw = 820
    $lh = [int]($lw * (477 / 1943))
    $lx = 1540
    $ly = 430

    # Draw subtle ambient drop shadow behind logo for maximum 3D metal relief
    $shadowMatrix = New-Object System.Drawing.Imaging.ColorMatrix
    $shadowMatrix.Matrix33 = 0.45
    $shadowAttr = New-Object System.Drawing.Imaging.ImageAttributes
    $shadowAttr.SetColorMatrix($shadowMatrix)

    # Ambient relief shadow
    $g.DrawImage($logoBmp, 
        (New-Object System.Drawing.Rectangle($lx + 4, $ly + 5, $lw, $lh)), 
        0, 0, $logoBmp.Width, $logoBmp.Height, 
        [System.Drawing.GraphicsUnit]::Pixel, 
        $shadowAttr
    )

    # Draw official pure white logo
    $g.DrawImage($logoBmp, $lx, $ly, $lw, $lh)
    
    $shadowAttr.Dispose()
    $logoBmp.Dispose()
}

$g.Dispose()

# Save as high-resolution PNG to Assets/background.png!
$targetPath = "c:\Users\Ansel\Documents\Hansai Shipping Line\Assets\background.png"
$bmp.Save($targetPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

"Successfully generated pristine 4K 2800x1350 Assets/background.png!"

