// 角色管理接口封装
import request from '@/utils/request'
// 获取所有角色
export function getAllRoles(params) {
  return request({
    url: '/sys/role',
    params// page 页码  pagesize 每页条数
  })
}
// 添加角色
export function addRoles(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
// 根据ID获取角色详情
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}
// 根据ID删除角色
export function deleteRoles(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}
// 根据ID更新角色
export function updateRoles(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'PUT'
  })
}
// 获取公司信息---根据id查询企业
export function getCompanyById(id) {
  return request({
    url: `/company/${id} `
  })
}

