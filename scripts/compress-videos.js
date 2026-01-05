#!/usr/bin/env node

/**
 * 비디오 파일 압축 스크립트
 *
 * 사용법: node scripts/compress-videos.js
 *
 * 원본 파일은 .backup 확장자를 추가하여 백업됩니다.
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const VIDEOS_DIR = path.join(__dirname, '../public/videos')

// 압축 설정
const COMPRESS_CONFIG = {
  mp4: {
    codec: 'libx264',
    preset: 'medium', // fast, medium, slow 중 선택 (slow가 더 작은 용량)
    crf: 28, // 0-51, 높을수록 작은 용량 (23-28 권장)
    audioCodec: 'aac',
    audioBitrate: '128k',
  },
  webm: {
    codec: 'libvpx-vp9',
    quality: 'good', // good, best 중 선택
    speed: 2, // 0-5, 높을수록 빠르지만 큰 용량
    audioCodec: 'libopus',
    audioBitrate: '128k',
  },
}

// 비디오 파일 찾기
function findVideoFiles(dir) {
  const files = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...findVideoFiles(fullPath))
    } else if (/\.(mp4|webm|mov)$/i.test(entry.name)) {
      files.push(fullPath)
    }
  }

  return files
}

// 파일 크기 가져오기 (MB)
function getFileSize(filePath) {
  const stats = fs.statSync(filePath)
  return (stats.size / (1024 * 1024)).toFixed(2)
}

// 비디오 압축
function compressVideo(inputPath, finalPath, format) {
  const config = COMPRESS_CONFIG[format]
  if (!config) {
    console.log(`⚠️  ${format} 형식은 지원하지 않습니다. 건너뜁니다.`)
    return false
  }

  // 임시 파일 경로 생성 (원본과 동일한 확장자 사용)
  const pathInfo = path.parse(finalPath)
  let actualOutputPath = finalPath
  let tempOutputPath

  if (format === 'mov') {
    // MOV는 MP4로 변환
    actualOutputPath = path.join(pathInfo.dir, `${pathInfo.name}.mp4`)
    tempOutputPath = path.join(pathInfo.dir, `${pathInfo.name}_compressed.mp4`)
  } else {
    tempOutputPath = path.join(pathInfo.dir, `${pathInfo.name}_compressed${pathInfo.ext}`)
  }

  try {
    let command

    // 오디오 스트림 확인
    const probeCommand = `ffprobe -v error -select_streams a:0 -show_entries stream=codec_type -of default=noprint_wrappers=1:nokey=1 "${inputPath}"`
    let hasAudio = false
    try {
      const probeResult = execSync(probeCommand, { encoding: 'utf8', stdio: 'pipe' })
      hasAudio = probeResult.trim() === 'audio'
    } catch {
      hasAudio = false
    }

    if (format === 'mp4') {
      if (hasAudio) {
        command = `ffmpeg -i "${inputPath}" -map 0 -c:v ${config.codec} -preset ${config.preset} -crf ${config.crf} -c:a ${config.audioCodec} -b:a ${config.audioBitrate} -movflags +faststart -y "${tempOutputPath}"`
      } else {
        command = `ffmpeg -i "${inputPath}" -map 0:v -c:v ${config.codec} -preset ${config.preset} -crf ${config.crf} -an -movflags +faststart -y "${tempOutputPath}"`
      }
    } else if (format === 'webm') {
      if (hasAudio) {
        command = `ffmpeg -i "${inputPath}" -map 0 -c:v ${config.codec} -quality ${config.quality} -speed ${config.speed} -b:v 0 -c:a ${config.audioCodec} -b:a ${config.audioBitrate} -y "${tempOutputPath}"`
      } else {
        command = `ffmpeg -i "${inputPath}" -map 0:v -c:v ${config.codec} -quality ${config.quality} -speed ${config.speed} -b:v 0 -an -y "${tempOutputPath}"`
      }
    } else {
      // MOV는 MP4로 변환
      if (hasAudio) {
        command = `ffmpeg -i "${inputPath}" -map 0 -c:v ${config.codec} -preset ${config.preset} -crf ${config.crf} -c:a ${config.audioCodec} -b:a ${config.audioBitrate} -movflags +faststart -y "${tempOutputPath}"`
      } else {
        command = `ffmpeg -i "${inputPath}" -map 0:v -c:v ${config.codec} -preset ${config.preset} -crf ${config.crf} -an -movflags +faststart -y "${tempOutputPath}"`
      }
    }

    console.log(`\n📹 압축 중: ${path.basename(inputPath)}`)
    execSync(command, { stdio: 'inherit' })

    const originalSize = parseFloat(getFileSize(inputPath))

    // 임시 파일이 생성되었는지 확인
    if (!fs.existsSync(tempOutputPath)) {
      throw new Error('압축된 파일이 생성되지 않았습니다.')
    }

    const compressedSize = parseFloat(getFileSize(tempOutputPath))
    const saved = (((originalSize - compressedSize) / originalSize) * 100).toFixed(1)

    // 원본 파일을 임시 파일로 교체
    if (format === 'mov') {
      // MOV 파일은 삭제하고 MP4로 교체
      if (fs.existsSync(finalPath)) {
        fs.unlinkSync(finalPath)
      }
    } else {
      // 원본 파일 삭제
      if (fs.existsSync(finalPath)) {
        fs.unlinkSync(finalPath)
      }
    }
    // 임시 파일을 최종 파일로 이동
    fs.renameSync(tempOutputPath, actualOutputPath)

    console.log(
      `✅ 완료: ${originalSize.toFixed(2)}MB → ${compressedSize.toFixed(2)}MB (${saved}% 감소)`,
    )
    return { success: true, compressedSize }
  } catch (error) {
    // 임시 파일 정리
    if (fs.existsSync(tempOutputPath)) {
      fs.unlinkSync(tempOutputPath)
    }
    console.error(`❌ 오류 발생: ${inputPath}`, error.message)
    return { success: false, compressedSize: null }
  }
}

// 메인 함수
function main() {
  console.log('🎬 비디오 압축 시작...\n')
  console.log(`📁 대상 디렉토리: ${VIDEOS_DIR}\n`)

  const videoFiles = findVideoFiles(VIDEOS_DIR)
  console.log(`📹 발견된 비디오 파일: ${videoFiles.length}개\n`)

  if (videoFiles.length === 0) {
    console.log('압축할 비디오 파일이 없습니다.')
    return
  }

  let totalOriginalSize = 0
  let totalCompressedSize = 0
  let successCount = 0

  for (const videoPath of videoFiles) {
    const ext = path.extname(videoPath).toLowerCase().slice(1)
    const format = ext === 'mov' ? 'mp4' : ext

    // 백업 파일 생성
    const backupPath = `${videoPath}.backup`
    if (!fs.existsSync(backupPath)) {
      console.log(`💾 백업 생성: ${path.basename(videoPath)}`)
      fs.copyFileSync(videoPath, backupPath)
    }

    const originalSize = parseFloat(getFileSize(videoPath))
    totalOriginalSize += originalSize

    // 압축 실행
    const result = compressVideo(videoPath, videoPath, format)

    if (result.success) {
      totalCompressedSize += result.compressedSize
      successCount++
    } else {
      totalCompressedSize += originalSize
    }
  }

  // 결과 요약
  console.log('\n' + '='.repeat(50))
  console.log('📊 압축 결과 요약')
  console.log('='.repeat(50))
  console.log(`✅ 성공: ${successCount}/${videoFiles.length}개`)
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

main()
