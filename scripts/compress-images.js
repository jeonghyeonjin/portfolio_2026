#!/usr/bin/env node

/**
 * 이미지 파일 압축 스크립트
 *
 * 사용법: node scripts/compress-images.js
 *
 * 원본 파일은 .backup 확장자를 추가하여 백업됩니다.
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 압축할 이미지 파일 목록 및 최대 크기 설정
const IMAGE_CONFIG = [
  {
    path: 'src/assets/images/works/master-forge/m4g_pin_mockup.png',
    maxWidth: 1920, // 풀스크린 배경 이미지 (2x 해상도 고려)
    maxHeight: 1080,
  },
  {
    path: 'src/assets/images/works/tape/tape_screenshot1.png',
    maxWidth: 1200, // 스크린샷 그리드 (content-section max-width)
    maxHeight: null, // 비율 유지
  },
  {
    path: 'src/assets/images/works/tape/tape_thumbnail.png',
    maxWidth: 800, // 썸네일 (작은 크기)
    maxHeight: null,
  },
  {
    path: 'public/videos/tape/tape_thumbnail-front.png',
    maxWidth: 1920, // 히어로 이미지
    maxHeight: 1080,
  },
]

// 파일 크기 가져오기 (MB)
function getFileSize(filePath) {
  const stats = fs.statSync(filePath)
  return (stats.size / (1024 * 1024)).toFixed(2)
}

// 이미지 압축 및 리사이즈 (sharp 사용)
async function compressImage(inputPath, outputPath, maxWidth, maxHeight) {
  try {
    // sharp가 설치되어 있는지 확인
    let sharp
    try {
      sharp = (await import('sharp')).default
    } catch (error) {
      console.error('❌ sharp가 설치되어 있지 않습니다.')
      console.error('   다음 명령어로 설치하세요: npm install --save-dev sharp')
      return false
    }

    const originalSize = parseFloat(getFileSize(inputPath))
    
    // 원본 이미지 메타데이터 확인
    const metadata = await sharp(inputPath).metadata()
    const originalWidth = metadata.width
    const originalHeight = metadata.height
    
    // 리사이즈가 필요한지 확인
    let needsResize = false
    let targetWidth = originalWidth
    let targetHeight = originalHeight
    
    if (maxWidth && originalWidth > maxWidth) {
      targetWidth = maxWidth
      needsResize = true
    }
    
    if (maxHeight && originalHeight > maxHeight) {
      targetHeight = maxHeight
      needsResize = true
    }
    
    // 비율 유지하면서 리사이즈
    if (needsResize) {
      if (maxWidth && maxHeight) {
        // 둘 다 지정된 경우: fit 방식으로 리사이즈
        await sharp(inputPath)
          .resize(maxWidth, maxHeight, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .png({
            quality: 85,
            compressionLevel: 9,
            adaptiveFiltering: true,
            palette: false,
          })
          .toFile(outputPath)
      } else if (maxWidth) {
        // 너비만 지정된 경우
        await sharp(inputPath)
          .resize(maxWidth, null, {
            withoutEnlargement: true,
          })
          .png({
            quality: 85,
            compressionLevel: 9,
            adaptiveFiltering: true,
            palette: false,
          })
          .toFile(outputPath)
      } else if (maxHeight) {
        // 높이만 지정된 경우
        await sharp(inputPath)
          .resize(null, maxHeight, {
            withoutEnlargement: true,
          })
          .png({
            quality: 85,
            compressionLevel: 9,
            adaptiveFiltering: true,
            palette: false,
          })
          .toFile(outputPath)
      }
    } else {
      // 리사이즈 불필요: 압축만 수행
      await sharp(inputPath)
        .png({
          quality: 85,
          compressionLevel: 9,
          adaptiveFiltering: true,
          palette: false,
        })
        .toFile(outputPath)
    }

    const compressedSize = parseFloat(getFileSize(outputPath))
    const saved = (((originalSize - compressedSize) / originalSize) * 100).toFixed(1)
    
    const finalMetadata = await sharp(outputPath).metadata()
    const sizeInfo = needsResize
      ? ` (${originalWidth}x${originalHeight} → ${finalMetadata.width}x${finalMetadata.height})`
      : ''

    console.log(`✅ 완료: ${originalSize}MB → ${compressedSize}MB (${saved}% 감소)${sizeInfo}`)
    return { success: true, compressedSize }
  } catch (error) {
    console.error(`❌ 오류 발생: ${inputPath}`, error.message)
    return { success: false, compressedSize: null }
  }
}

// 메인 함수
async function main() {
  console.log('🖼️  이미지 압축 시작...\n')

  // sharp 설치 확인
  try {
    await import('sharp')
  } catch (error) {
    console.error('❌ sharp가 설치되어 있지 않습니다.')
    console.error('   다음 명령어로 설치하세요: npm install --save-dev sharp\n')
    process.exit(1)
  }

  let totalOriginalSize = 0
  let totalCompressedSize = 0
  let successCount = 0

  for (const imageConfig of IMAGE_CONFIG) {
    const fullPath = path.join(__dirname, '..', imageConfig.path)

    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  파일을 찾을 수 없습니다: ${imageConfig.path}`)
      continue
    }

    const originalSize = parseFloat(getFileSize(fullPath))
    totalOriginalSize += originalSize

    // 백업 파일 생성
    const backupPath = `${fullPath}.backup`
    if (!fs.existsSync(backupPath)) {
      console.log(`💾 백업 생성: ${path.basename(fullPath)}`)
      fs.copyFileSync(fullPath, backupPath)
    }

    // 임시 파일 경로 생성
    const pathInfo = path.parse(fullPath)
    const tempPath = path.join(pathInfo.dir, `${pathInfo.name}_compressed${pathInfo.ext}`)

    const sizeInfo = imageConfig.maxWidth
      ? ` (최대 ${imageConfig.maxWidth}px${imageConfig.maxHeight ? ` x ${imageConfig.maxHeight}px` : ''})`
      : ''
    console.log(`\n📷 압축 중: ${path.basename(fullPath)}${sizeInfo}`)

    // 압축 실행
    const result = await compressImage(
      fullPath,
      tempPath,
      imageConfig.maxWidth,
      imageConfig.maxHeight,
    )

    if (result.success) {
      // 원본 파일을 임시 파일로 교체
      fs.unlinkSync(fullPath)
      fs.renameSync(tempPath, fullPath)

      totalCompressedSize += result.compressedSize
      successCount++
    } else {
      // 실패 시 임시 파일 삭제
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath)
      }
      totalCompressedSize += originalSize
    }
  }

  // 결과 요약
  console.log('\n' + '='.repeat(50))
  console.log('📊 압축 결과 요약')
  console.log('='.repeat(50))
  console.log(`✅ 성공: ${successCount}/${IMAGE_CONFIG.length}개`)
  console.log(`📦 원본 총 용량: ${totalOriginalSize.toFixed(2)}MB`)
  console.log(`📦 압축 후 용량: ${totalCompressedSize.toFixed(2)}MB`)
  console.log(`💾 절약된 용량: ${(totalOriginalSize - totalCompressedSize).toFixed(2)}MB`)
  console.log(
    `📉 압축률: ${(((totalOriginalSize - totalCompressedSize) / totalOriginalSize) * 100).toFixed(1)}%`,
  )
  console.log('='.repeat(50))
  console.log('\n💡 원본 파일은 .backup 확장자로 백업되었습니다.')
  console.log('   만족스러우면 백업 파일을 삭제하세요.\n')
}

main().catch((error) => {
  console.error('❌ 스크립트 실행 중 오류 발생:', error)
  process.exit(1)
})
